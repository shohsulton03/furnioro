import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Cart } from './models/cart.model';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({ status: 201, description: 'Cart successfully created.' })  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @ApiOperation({ summary: 'Get list of carts' })
  @ApiResponse({ status: 200, description: 'List of all carts.',type: [Cart] })
  @Get()
  findAll() {
    return this.cartService.findAll();
  }
  @ApiOperation({ summary: 'Get a cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart data. ' , type: [Cart] })
  @ApiResponse({ status: 404, description: 'Cart not found.', })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }


  @ApiOperation({ summary: 'Update a Cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart successfully updated.' ,  type: [Cart]})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @ApiOperation({ summary: 'Delete a Cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart successfully deleted.' ,  type: [Cart]})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
