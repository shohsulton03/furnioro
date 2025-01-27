import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { QueryFilterDto } from './dto/query-filter.dto';
import { Op } from 'sequelize';
import { DiscountService } from 'src/discount/discount.service';
import { CategoryService } from 'src/category/category.service';
import { FileService } from '../file/file.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    private categoryService: CategoryService,
    private discountService: DiscountService,
    private readonly fileService: FileService,
  ) {}

  async create(createProductDto: CreateProductDto, files: Array<any>) {
    if (!createProductDto.categoryId) {
      throw new BadRequestException('Category ID is required');
    }

    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    if (!category) {
      throw new BadRequestException(
        `Category with ID ${createProductDto.categoryId} not found`,
      );
    }

    let discount = null;
    if (createProductDto.discountId) {
      discount = await this.discountService.findOne(
        createProductDto.discountId,
      );
      if (!discount) {
        throw new BadRequestException(
          `Discount with ID ${createProductDto.discountId} not found`,
        );
      }
    }

    const images = await Promise.all(
      files.map((file) => this.fileService.saveFile(file)),
    );

    createProductDto.images = images;

    return this.productModel.create({ ...createProductDto });
  }

  async findAll(query: QueryFilterDto) {
    const whereConditions: any = {};

    // Filtering based on fields
    if (query.title) {
      whereConditions.title = { [Op.iLike]: `%${query.title}%` }; // Case-insensitive
    }
    if (query.price_min && query.price_max) {
      whereConditions.price = {
        [Op.between]: [query.price_min, query.price_max],
      }; // Price range
    } else if (query.price_min) {
      whereConditions.price = { [Op.gte]: query.price_min }; // Price greater than or equal
    } else if (query.price_max) {
      whereConditions.price = { [Op.lte]: query.price_max }; // Price less than or equal
    }
    if (query.categoryId) {
      whereConditions.categoryId = query.categoryId;
    }
    if (query.created_country) {
      whereConditions.created_country = {
        [Op.iLike]: `%${query.created_country}%`,
      };
    }
    if (query.colors) {
      whereConditions.colors = { [Op.contains]: query.colors }; // Filters products that contain specified colors
    }
    if (query.weight) {
      whereConditions.weight = query.weight;
    }
    if (query.width) {
      whereConditions.width = query.width;
    }
    if (query.height) {
      whereConditions.height = query.height;
    }
    if (query.depth) {
      whereConditions.depth = query.depth;
    }
    if (query.garanty) {
      whereConditions.garanty = query.garanty;
    }
    if (query.filling_material) {
      whereConditions.filling_material = {
        [Op.iLike]: `%${query.filling_material}%`,
      };
    }
    if (query.upholstery_material) {
      whereConditions.upholstery_material = {
        [Op.iLike]: `%${query.upholstery_material}%`,
      };
    }
    if (query.secondary_material) {
      whereConditions.secondary_material = {
        [Op.iLike]: `%${query.secondary_material}%`,
      };
    }

    // Pagination logic
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.productModel.findAndCountAll({
      where: whereConditions,
      include: { all: true },
      limit,
      offset,
      order: [['id', 'DESC']],
    });

    return {
      data: rows,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findOne(id: number) {
    return this.productModel.findByPk(id, { include: { all: true } });
  }

  // async update(
  //   id: number,
  //   updateProductDto: UpdateProductDto,
  //   files: Array<any>,
  // ) {
  //   const updatedProduct = await this.productModel.update(
  //     { ...updateProductDto },
  //     { where: { id }, returning: true },
  //   );
  //   return updatedProduct[1][0];
  // }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    files: Array<any>,
  ) {
    try {
      const product = await this.productModel.findByPk(id);
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      // Kategoriya IDni tekshirish
      if (updateProductDto.categoryId) {
        const category = await this.categoryService.findOne(
          updateProductDto.categoryId,
        );
        if (!category) {
          throw new BadRequestException(
            `Category with ID ${updateProductDto.categoryId} not found`,
          );
        }
      }

      // Chegirma IDni tekshirish
      if (updateProductDto.discountId) {
        const discount = await this.discountService.findOne(
          updateProductDto.discountId,
        );
        if (!discount) {
          throw new BadRequestException(
            `Discount with ID ${updateProductDto.discountId} not found`,
          );
        }
      }

      // Yangi rasmlarni saqlash
      let images = product.images || [];
      if (files && files.length > 0) {
        // Eski rasmlarni o'chirish
        await Promise.all(
          images.map((img) => this.fileService.deleteFile(img)),
        );

        // Yangi rasmlarni saqlash
        images = await Promise.all(
          files.map((file) => this.fileService.saveFile(file)),
        );

        updateProductDto.images = images;
      }

      const updatedProduct = await this.productModel.update(
        { ...updateProductDto },
        { where: { id }, returning: true },
      );
      return updatedProduct[1][0];
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    const deleteProduct = await this.productModel.findByPk(id);
    if (!deleteProduct) {
      throw new NotFoundException('Id bo‘yicha maʼlumot topilmadi');
    }
    try {
      await Promise.all(
        deleteProduct.images.map(async (img) => {
          await this.fileService.deleteFile(img);
        }),
      );
    } catch (error) {
      throw new BadRequestException(
        `Fayllarni o‘chirishda xatolik yuz berdi: ${error.message}`,
      );
    }
    return this.productModel.destroy({ where: { id } });
  }
}
