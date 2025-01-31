import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './models/wishlist.model';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { User } from '../user/models/user.model';
import { Product } from '../product/model/product.model';
import { Op } from 'sequelize';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist) private wishlistModel: typeof Wishlist,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Product) private productModel: typeof Product,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  async create(
    createWishlistDto: CreateWishlistDto,
  ): Promise<{ message: string; wishlist?: Wishlist }> {
    console.log(1);
    const [product, user] = await Promise.all([
      this.productService.findOne(createWishlistDto.product_id),
      this.userService.findOne(createWishlistDto.user_id),
    ]);

    if (!product) {
      throw new BadRequestException(
        `Product with ID:${createWishlistDto.product_id} not found.`,
      );
    }
    if (!user) {
      throw new BadRequestException(
        `User with ID:${createWishlistDto.user_id} not found.`,
      );
    }

    const existingWishlist = await this.wishlistModel.findOne({
      where: {
        user_id: createWishlistDto.user_id,
        product_id: createWishlistDto.product_id,
      },
    });

    if (existingWishlist) {
      await this.wishlistModel.destroy({ where: { id: existingWishlist.id } });
      return { message: 'Wishlist item removed successfully.' };
    }

    const newWishlist = await this.wishlistModel.create(createWishlistDto);
    return {
      message: 'Wishlist item added successfully.',
      wishlist: newWishlist,
    };
  }

  async saveWishLists(userId: number, wishlists: number[]) {
    if (!Array.isArray(wishlists)) {
      throw new BadRequestException(
        'Wishlist must be an array of product IDs.',
      );
    }

    const user = await this.userModel.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID: ${userId} not found.`);
    }

    const existingsLikes = await this.wishlistModel.findAll({
      where: { user_id: userId, product_id: { [Op.in]: wishlists } },
    });

    const existingProductIds = existingsLikes.map((like) => like.product_id);
    const newProductsId = wishlists.filter(
      (id) => !existingProductIds.includes(id),
    );

    if (!newProductsId.length) {
      return { message: 'No new products to add to the wishlist.' };
    }

    const newLikes = newProductsId.map((productId) =>
      this.wishlistModel.create({ user_id: userId, product_id: productId }),
    );

    await Promise.all(newLikes);

    return {
      message: 'Wishlist successfully updated.',
      data: { addedProductIds: newProductsId },
    };
  }

  // findAll() {
  //   return this.wishlistModel.findAll({ include: { all: true } });
  // }

  async findByUserId(
    userId: number,
  ): Promise<{ message: string; data: any[] }> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new BadRequestException(`User with ID:${userId} not found`);
    }

    const wihses = await this.wishlistModel.findAll({
      where: { user_id: userId },
    });

    const likedProductIds = wihses.map((wish) => +wish.product_id);
    if (likedProductIds.length === 0) {
      return {
        message: 'No liked products found for this client.',
        data: [],
      };
    }

    const products = await this.productModel.findAll({
      where: { id: likedProductIds },
    });

    const productsWithLikes = products.map((product) => ({
      ...product.get({ plain: true }),
      isLike: (likedProductIds ?? []).includes(+product.id),
    }));

    return {
      message: 'All liked products retrieved successfully.',
      data: productsWithLikes,
    };
  }

  findOne(id: number) {
    return this.wishlistModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto) {
    const wishlist = await this.wishlistModel.update(
      { ...updateWishlistDto },
      { where: { id }, returning: true },
    );
    return wishlist[1][0];
  }

  remove(id: number) {
    return this.wishlistModel.destroy({ where: { id } });
  }
}
