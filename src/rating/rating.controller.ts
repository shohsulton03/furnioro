import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Rating } from './models/rating.model';

@ApiTags('Ratings')
@Controller('rating')
export class RatingController {
  private readonly logger = new Logger(RatingController.name);

  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({ summary: 'Add a new rating.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Rating successfully created.',
    type: Rating,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided.',
  })
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('Admin', 'Moderator') // Only Admins and Moderators can add ratings
  @Post()
  async create(@Body() createRatingDto: CreateRatingDto) {
    try {
      const result = await this.ratingService.create(createRatingDto);
      this.logger.log(`Rating created successfully: ${JSON.stringify(result)}`);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Rating created successfully',
        data: result,
      };
    } catch (error) {
      this.logger.error(`Failed to create rating: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to create rating',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get all ratings.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved ratings.',
    type: [Rating],
  })
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      const results = await this.ratingService.findAll();
      this.logger.log('Fetched all ratings successfully.');
      return {
        statusCode: HttpStatus.OK,
        message: 'Ratings fetched successfully',
        data: results,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch ratings: ${error.message}`);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch ratings',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Get a rating by ID.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved rating.',
    type: Rating,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rating not found.',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.ratingService.findOne(+id);
      if (!result) {
        this.logger.warn(`Rating with ID ${id} not found.`);
        throw new HttpException(
          { statusCode: HttpStatus.NOT_FOUND, message: 'Rating not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.log(`Fetched rating with ID ${id} successfully.`);
      return {
        statusCode: HttpStatus.OK,
        message: 'Rating fetched successfully',
        data: result,
      };
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND
      ) {
        return error.getResponse(); // Return the "not found" response message
      }
      this.logger.error(
        `Failed to fetch rating with ID ${id}: ${error.message}`,
      );
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch rating',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Update a rating by ID.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rating successfully updated.',
    type: Rating,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rating not found.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
  ) {
    try {
      // Use the service to update the rating
      const updatedRating = await this.ratingService.update(
        +id,
        updateRatingDto,
      );
      if (!updatedRating) {
        this.logger.warn(`Rating with ID ${id} not found for update.`);
        throw new HttpException(
          { statusCode: HttpStatus.NOT_FOUND, message: 'Rating not found' },
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.log(`Updated rating with ID ${id} successfully.`);
      return {
        statusCode: HttpStatus.OK,
        message: 'Rating updated successfully',
        data: updatedRating,
      };
    } catch (error) {
      this.logger.error(
        `Failed to update rating with ID ${id}: ${error.message}`,
      );
      if (error instanceof HttpException) {
        throw error; // Re-throw if it's an expected HttpException like 404
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update rating',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Delete a rating by ID.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rating successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Rating not found.',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      // Use the service to check if the rating exists
      const rating = await this.ratingService.findOne(+id);
      if (!rating) {
        this.logger.warn(`Rating with ID ${id} not found for deletion.`);
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Rating not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      // Proceed with deletion if the rating is found
      const deleted = await this.ratingService.remove(+id);
      if (deleted) {
        this.logger.log(`Deleted rating with ID ${id} successfully.`);
        return {
          statusCode: HttpStatus.OK,
          message: 'Rating deleted successfully',
          id,
        };
      } else {
        this.logger.error(`Failed to delete rating with ID ${id}.`);
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to delete rating',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to delete rating with ID ${id}: ${error.message}`,
        error.stack,
      );
      if (error instanceof HttpException) {
        throw error; // Re-throw if it's an expected HttpException like 404
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete rating',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // ---------------Rating--------------- 
  @Get('average/:productId')
  @ApiOperation({ summary: 'Calculate average rating for a product' })
  @ApiParam({
    name: 'productId',
    type: Number,
    description: 'ID of the product',
    example: 1,
  })
  async calculateAverageRating(@Param('productId') productId: number) {
    try {
      return await this.ratingService.calculateProductRating(productId);
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
