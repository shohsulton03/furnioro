import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './models/image.model';
import { FileService } from '../file/file.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image) private imageModel: typeof Image,
    private readonly fileService: FileService,
  ) {}

  async create(
    createImageDto: CreateImageDto,
    images: Array<any>,
  ) {
    const fileNames = await Promise.all(
      images.map((image) => this.fileService.saveFile(image)),
    );
    const createdImages = fileNames.map((fileName) =>
      this.imageModel.create({ ...createImageDto, image: fileName }),
    );
    return Promise.all(createdImages);
  }

  async findAll() {
    return this.imageModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.imageModel.findByPk(id, { include: { all: true } });
  }

  async update(
    id: number,
    updateImageDto: UpdateImageDto,
    images: Array<any>,
  ) {
    const updatedImage = await this.imageModel.findByPk(id);
    if (!updatedImage) {
      throw new NotFoundException('Id bo‘yicha maʼlumot topilmadi');
    }

    if (updatedImage.image) {
      await this.fileService.deleteFile(updatedImage.image);
    }

    const fileNames = await Promise.all(
      images.map((image) => this.fileService.saveFile(image)),
    );
    const updated = await this.imageModel.update(
      { ...updateImageDto, image: fileNames.join(',') },
      { where: { id }, returning: true },
    );
    return updated[1][0];
  }

  async remove(id: number) {
    const deletedImage = await this.imageModel.findByPk(id);
    if (!deletedImage) {
      throw new NotFoundException('Id bo‘yicha maʼlumot topilmadi');
    }

    // Faylni o‘chirish
    await this.fileService.deleteFile(deletedImage.image);
    return this.imageModel.destroy({ where: { id } });
  }
}
