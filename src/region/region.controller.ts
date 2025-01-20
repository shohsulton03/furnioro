import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards,
  HttpCode
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Create a new region' })
  @ApiResponse({ status: 201, description: 'The region has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @UseGuards(AdminGuard)
  @HttpCode(200) 
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: 'Retrieve all regions' })
  @ApiResponse({ status: 200, description: 'List of regions retrieved successfully.' })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a specific region by ID' })
  @ApiResponse({ status: 200, description: 'Region retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Region not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a region by ID' })
  @ApiResponse({ status: 200, description: 'Region updated successfully.' })
  @ApiResponse({ status: 404, description: 'Region not found.' })
  @UseGuards(AdminGuard)
  @HttpCode(200) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'Delete a region by ID' })
  @ApiResponse({ status: 200, description: 'Region deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Region not found.' })
  @UseGuards(AdminGuard)
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}