import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Discount } from './models/discount.model';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags("discount")
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}


  @ApiOperation({ summary: "Create one Discount."})
  @ApiResponse({
    status:200,
    description: "One Discount.",
    type: [Discount]
  })
  @UseGuards(AdminGuard)
  @HttpCode(200)
  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @ApiOperation({ summary: "Get all Discount."})
  @ApiResponse({
    status:200,
    description: "List of Discount.",
    type: [Discount]
  })
  @HttpCode(200)
  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @ApiOperation({ summary: "Get by id discount."})
  @ApiResponse({
    status:200,
    description: "see one discount.",
    type: Discount
  })
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(+id);
  }

  @ApiOperation({ summary: "Updated by id discount."})
  @ApiResponse({
    status:200,
    description: "update one discount.",
    type: Discount
  })
  @HttpCode(200)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @ApiOperation({ summary: "Updated by id discount."})
  @ApiResponse({
    status:200,
    description: "delete one discount.",
    type: Discount
  })
  @HttpCode(200)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountService.remove(+id);
  }
}
