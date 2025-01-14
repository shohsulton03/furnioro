import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@ApiTags('Order Items')
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @ApiOperation({ summary: 'Create a new order item' })
  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @ApiOperation({ summary: 'Get all order items' })
  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @ApiOperation({ summary: 'Get an order item by ID' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.orderItemService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an order item' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemService.update(id, updateOrderItemDto);
  }

  @ApiOperation({ summary: 'Delete an order item' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderItemService.remove(id);
  }
}
