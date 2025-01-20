import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './models/cart.model';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private readonly cartModel: typeof Cart,
    private readonly userService: UserService
  ){}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const user = await this.userService.findOne(createCartDto.user_id);
    if (!user) {
      throw new BadRequestException(`User with ID ${createCartDto.user_id} not found`);
    }
    // return await this.cartModel.create(createCartDto)
    // const createdAt = new Date()
    return await this.cartModel.create({...createCartDto})
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
    const user = await this.userService.findOne(updateCartDto.user_id);
    if (!user) {
      throw new BadRequestException(`User with ID ${updateCartDto.user_id} not found`);
    }
    const cart = await this.findOne(id);
    await cart.update(updateCartDto);
    await cart.save();
    return cart;
  }


  async remove(id: number): Promise<void> {
    const cart = await this.findOne(id);
    await cart.destroy();
  }
}
