import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags("payment")
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: "Create one Payment."})
    @ApiResponse({
      status:200,
      description: "One Payment.",
      type: [Payment]
    })
  @HttpCode(200)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: "Get all PAyment."})
    @ApiResponse({
      status:200,
      description: "List of Payment.",
      type: [Payment]
    })
  @HttpCode(200)
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: "Get by id payment."})
  @ApiResponse({
    status:200,
    description: "see one payment.",
    type: Payment
  })
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({ summary: "Updated by id payment."})
    @ApiResponse({
      status:200,
      description: "update one payment.",
      type: Payment
    })
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: "Updated by id payment."})
  @ApiResponse({
      status:200,
      description: "delete one payment.",
      type: Payment
  })
  @HttpCode(200)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
