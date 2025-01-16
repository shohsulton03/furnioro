import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './models/cart_item.model';

@Injectable()
export class CartItemsService {
    constructor(
      @InjectModel(CartItem)
      private readonly cartItemModel: typeof CartItem,
    ){}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    return await this.cartItemModel.create(createCartItemDto)
  }

  async findAll(): Promise<CartItem[]> {
    return await this.cartItemModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<CartItem> {
    const cart = await this.cartItemModel.findByPk(id);
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async update(id: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    const cart = await this.findOne(id);
    await cart.update(updateCartItemDto);
    return cart;
  }


  async remove(id: number): Promise<void> {
    const cart = await this.findOne(id);
    await cart.destroy();
  }
}
