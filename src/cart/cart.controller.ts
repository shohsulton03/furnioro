import { AdminGuard } from './../common/guards/admin.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Cart } from './models/cart.model';
import { UserSelfForUpdateGuard } from 'src/common/guards/user-self-for-update.guard';
import { UserSelfGuard } from 'src/common/guards/user-self.guard';
import { AdminCreatorGuard } from 'src/common/guards/admin-creator.guard';
import { UserGuard } from 'src/common/guards/user.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({ status: 201, description: 'Cart successfully created.' })
  @UseGuards(UserGuard)
  @HttpCode(HttpStatus.CREATED) 
  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @ApiOperation({ summary: 'Get list of carts' })
  @ApiResponse({ status: 200, description: 'List of all carts.', type: [Cart] })
  @UseGuards(AdminGuard, AdminCreatorGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.cartService.findAll();
  }
  
  @ApiOperation({ summary: 'Get a cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart data.', type: Cart })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  @UseGuards(UserSelfForUpdateGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a Cart by ID' })
  @ApiResponse({ status: 202, description: 'Cart successfully updated.', type: Cart })
  @UseGuards(AdminGuard, UserSelfGuard, AdminCreatorGuard) 
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @ApiOperation({ summary: 'Delete a Cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart successfully deleted.', type: Cart })
  @UseGuards(UserSelfForUpdateGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
