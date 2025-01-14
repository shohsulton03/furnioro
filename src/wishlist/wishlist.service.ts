import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlist } from './models/wishlist.model';

@Injectable()
export class WishlistService {

  constructor(@InjectModel(Wishlist) private wishlistModel: typeof Wishlist) {}

  create(createWishlistDto: CreateWishlistDto) {
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
