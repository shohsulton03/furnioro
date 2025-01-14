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

  async create(createImageDto: CreateImageDto, image:any) {
    const fileName = await this.fileService.saveFile(image)
    return this.imageModel.create({...createImageDto, image:fileName});
  }

  async findAll() {
    return this.imageModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.imageModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateImageDto: UpdateImageDto, image:any) {
    const updatedImage = await this.imageModel.findByPk(id)
    if (!updatedImage) {
      throw new NotFoundException("Id buyicha malumot topilmadi")
    }
    await this.fileService.deleteFile(updatedImage.image)
    const fileName = await this.fileService.saveFile(image)
    const updated = await this.imageModel.update({...updateImageDto, image:fileName}, {where:{id}, returning:true})
    return updated[1][0];
  }

  async remove(id: number) {
    const deletedImage = await this.imageModel.findByPk(id)
    if (!deletedImage) {
      throw new NotFoundException('Id buyicha malumot topilmadi');
    }
    await this.fileService.deleteFile(deletedImage.image)
    return this.imageModel.destroy({ where: { id } });
  }
}
