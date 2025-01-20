import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Image } from './models/image.model';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: 'Add new images' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: [Image],
  })
  @UseInterceptors(FilesInterceptor('images', 10)) // 10 ta fayl yuklash uchun limit
  @Post()
  create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFiles() images: Array<any>,
  ) {
    return this.imagesService.create(createImageDto, images);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All image value',
    type: [Image],
  })
  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: Image,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update images by Id' })
  @ApiResponse({
    status: 200,
    description: 'Updated by Id',
    type: [Image],
  })
  @UseInterceptors(FilesInterceptor('images', 10)) // 10 ta fayl uchun
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
    @UploadedFiles() images: Array<any>,
  ) {
    return this.imagesService.update(+id, updateImageDto, images);
  }

  @ApiOperation({ summary: 'Delete one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Deleted by Id',
    type: Number,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
