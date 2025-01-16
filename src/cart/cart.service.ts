import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private readonly cartModel: typeof Cart,
  ){}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    return await this.cartModel.create(createCartDto)
    
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.cartModel.findByPk(id);
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cart = await this.findOne(id);
    await cart.update(updateCartDto);
    return cart;
  }


  async remove(id: number): Promise<void> {
    const cart = await this.findOne(id);
    await cart.destroy();
  }
}
