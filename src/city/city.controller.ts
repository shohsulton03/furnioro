import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({ summary: 'Create a new city' })
  @ApiResponse({ status: 201, description: 'City successfully created.' })
  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 200, description: 'List of cities.' })
  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @ApiOperation({ summary: 'Get a city by ID' })
  @ApiResponse({ status: 200, description: 'City data.' })
  @ApiResponse({ status: 404, description: 'City not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a city by ID' })
  @ApiResponse({ status: 200, description: 'City successfully updated.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @ApiOperation({ summary: 'Delete a city by ID' })
  @ApiResponse({ status: 200, description: 'City successfully deleted.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}
