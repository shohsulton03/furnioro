import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderAddressService } from './order_address.service';
import { CreateOrderAddressDto } from './dto/create-order_address.dto';
import { UpdateOrderAddressDto } from './dto/update-order_address.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Order-address')
@Controller('order-address')
export class OrderAddressController {
  constructor(private readonly orderAddressService: OrderAddressService) {}

  @Post('create')
  @ApiOperation({ summary: 'Creating order_address ' })
  @ApiResponse({ status: 201, description: 'Order_address create' })
  create(@Body() createOrderAddressDto: CreateOrderAddressDto) {
    return this.orderAddressService.create(createOrderAddressDto);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all order_address ' })
  @ApiResponse({ status: 201, description: 'Get All Order_address ' })
  findAll() {
    return this.orderAddressService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get find order_address ' })
  @ApiResponse({ status: 201, description: 'Get Find Order_address ' })
  findOne(@Param('id') id: string) {
    return this.orderAddressService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update order_address ' })
  @ApiResponse({ status: 201, description: 'Update order_address ' })
  update(
    @Param('id') id: string,
    @Body() updateOrderAddressDto: UpdateOrderAddressDto,
  ) {
    return this.orderAddressService.update(+id, updateOrderAddressDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete order_address ' })
  @ApiResponse({ status: 201, description: 'Delete Order_address ' })
  remove(@Param('id') id: string) {
    return this.orderAddressService.remove(+id);
  }
}
