import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './models/wishlist.model';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WishlistService {

  constructor(
    @InjectModel(Wishlist) private wishlistModel: typeof Wishlist,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    const product = await this.productService.findOne(createWishlistDto.product_id);
    const user = await this.userService.findOne(createWishlistDto.user_id);
    
    if (!product ||!user) {
      throw new Error('Product or user not found');
    }
    return this.wishlistModel.create(createWishlistDto);
  }

  findAll() {
    return this.wishlistModel.findAll({ include: { all: true } });
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
