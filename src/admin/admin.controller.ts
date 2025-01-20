import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminSelfGuard } from '../common/guards/admin-self.guard';
import { AdminCreatorGuard } from '../common/guards/admin-creator.guard';
import { AdminSelfForUpdateGuard } from '../common/guards/admin-self-for-update.guard';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  
  @ApiOperation({ summary: 'Add new admin' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: Admin,
  })
  @UseGuards(AdminCreatorGuard)
<<<<<<< HEAD
=======
  @HttpCode(HttpStatus.CREATED)
>>>>>>> cfe73f3f4893fd88031a288029e943abd9306d4b
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All admin value',
    type: [Admin],
  })
  @UseGuards(AdminCreatorGuard)
<<<<<<< HEAD
=======
  @HttpCode(HttpStatus.OK)
>>>>>>> cfe73f3f4893fd88031a288029e943abd9306d4b
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: Admin,
  })
  @UseGuards(AdminSelfGuard)
<<<<<<< HEAD
=======
  @HttpCode(HttpStatus.OK)
>>>>>>> cfe73f3f4893fd88031a288029e943abd9306d4b
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: Admin,
  })
<<<<<<< HEAD
  @UseGuards(AdminSelfForUpdateGuard)
=======
  @UseGuards(AdminCreatorGuard)
  @HttpCode(HttpStatus.OK)
>>>>>>> cfe73f3f4893fd88031a288029e943abd9306d4b
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Delete by Id',
    type: Number,
  })
  @UseGuards(AdminCreatorGuard)
<<<<<<< HEAD
=======
  @HttpCode(HttpStatus.OK)
>>>>>>> cfe73f3f4893fd88031a288029e943abd9306d4b
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}