import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './model/product.model';
import { QueryFilterDto } from './dto/query-filter.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FormDataDto } from './dto/form-data.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Add new product' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: Product,
  })
  @UseGuards(AdminGuard)
  @UseInterceptors(FilesInterceptor('files', 10))
  @Post()
  create(@Body() formDataDto: FormDataDto, @UploadedFiles() files: Array<any>) {
    const colors = formDataDto.colors.split(',');
    return this.productService.create({ ...formDataDto, colors }, files);
  }

  @ApiOperation({ summary: 'Get all products with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns filtered and paginated product data',
    type: [Product],
  })
  @Get()
  findAll(@Query() query: QueryFilterDto) {
    return this.productService.findAll(query);
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: Product,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: Product,
  })
  @UseGuards(AdminGuard)
  @UseInterceptors(FilesInterceptor('files', 10))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() formDataDto: FormDataDto,
    @UploadedFiles() files: Array<any>,
  ) {
    const colors = formDataDto.colors
      ? formDataDto.colors.split(',')
      : undefined;
    return this.productService.update(+id, { ...formDataDto, colors }, files);
  }

  @ApiOperation({ summary: 'Delete one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Delete by Id',
    type: Number,
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
