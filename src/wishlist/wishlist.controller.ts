import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Wishlist } from './models/wishlist.model';
import { AdminGuard } from '../common/guards/admin.guard';
import { UserGuard } from '../common/guards/user.guard';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @ApiOperation({ summary: 'Add new data.' })
  @ApiResponse({
    status: 200,
    description: 'Added',
    type: Wishlist,
  })
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @ApiResponse({ status: 201, description: 'Wishlist successfully updated.' })
  @ApiResponse({ status: 404, description: 'client not found.' })
  @Post('/wish/:userId')
  async saveWishlist(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('wishlist') wishlist: number[],
  ) {
    return this.wishlistService.saveWishLists(userId, wishlist);
  }

  // @ApiOperation({ summary: 'Get all data.' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Get all',
  //   type: Wishlist,
  // })
  // @Get()
  // findAll() {
  //   return this.wishlistService.findAll();
  // }

  @ApiOperation({ summary: 'Get wishlist products by UserId' })
  @ApiResponse({
    status: 200,
    description: 'Get by UserId',
    type: Wishlist,
  })
  @Get('/user/:id')
  findByUserId(@Param('id') id: string) {
    return this.wishlistService.findByUserId(+id);
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get by Id',
    type: Wishlist,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: Wishlist,
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistService.update(+id, updateWishlistDto);
  }

  @ApiOperation({ summary: 'Delete one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Delete by Id',
    type: Wishlist,
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(+id);
  }
}
