import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './models/cart_item.model';
import { Cart } from 'src/cart/models/cart.model';
import { CartService } from 'src/cart/cart.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartItemsService {
    constructor(
      @InjectModel(CartItem) private readonly cartItemModel: typeof CartItem,
      private readonly cartItemService: CartService,
      private readonly cartService: ProductService,
    ){}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    const cart = await this.cartService.findOne(createCartItemDto.cart_id);
    const product = await this.cartService.findOne(createCartItemDto.product_id);

    if (!product || !cart) {
      throw new BadRequestException(`Cart and Product with ID ${createCartItemDto.cart_id} and ${createCartItemDto.product_id} not found`);
    }

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
