
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { UserSelfGuard } from 'src/common/guards/user-self.guard';
import { UserGuard } from 'src/common/guards/user.guard';

@ApiTags('Cart Items') // Swagger'da bo'lim nomini belgilash
@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @ApiOperation({ summary: 'Create a new cart item' })
  @ApiResponse({ status: 201, description: 'Cart item created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @UseGuards(UserGuard) 
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemsService.create(createCartItemDto);
  }

  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, description: 'List of all cart items.' })
  @UseGuards(UserGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.cartItemsService.findAll();
  }

  @ApiOperation({ summary: 'Get a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item found successfully.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  @UseGuards(UserSelfGuard) 
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid update data.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  @UseGuards(UserSelfGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemsService.update(+id, updateCartItemDto);
  }

  @ApiOperation({ summary: 'Delete a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  @UseGuards(UserSelfGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemsService.remove(+id);
  }
}
