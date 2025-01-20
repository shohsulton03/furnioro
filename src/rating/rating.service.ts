import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './models/rating.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RatingService {
  private readonly logger = new Logger(RatingService.name);

  constructor(
    @InjectModel(Rating) private readonly ratingModel: typeof Rating,  
  ) {}

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    try {
      const rating = await this.ratingModel.create(createRatingDto);
      this.logger.log(`Created a new rating with ID ${rating.id}`);
      return rating;
    } catch (error) {
      this.logger.error(`Failed to create rating: ${error.message}`);
      throw new HttpException('Failed to create rating', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Rating[]> {
    try {
      const ratings = await this.ratingModel.findAll({ include: { all: true } });
      this.logger.log(`Fetched ${ratings.length} ratings`);
      return ratings;
    } catch (error) {
      this.logger.error(`Failed to fetch ratings: ${error.message}`);
      throw new HttpException('Failed to fetch ratings', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Rating> {
    try {
      const rating = await this.ratingModel.findByPk(id, { include: { all: true } });
      
      if (!rating) {
        throw new HttpException(
          {
            message: 'Rating not found', 
            statusCode: HttpStatus.NOT_FOUND
          },
          HttpStatus.NOT_FOUND
        );
      }
      this.logger.log(`Fetched rating with ID ${id}`);
      return rating;
    } catch (error) {
      this.logger.error(`Failed to fetch rating with ID ${id}: ${error.message}`);
      throw error instanceof HttpException
        ? error
        : new HttpException('Failed to fetch rating', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    try {
      const [rowsUpdated, [updatedRating]] = await this.ratingModel.update(updateRatingDto, {
        where: { id },
        returning: true,
      });

      if (rowsUpdated === 0) {
        this.logger.warn(`Rating with ID ${id} not found for update`);
        throw new HttpException('Rating not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Updated rating with ID ${id}`);
      return updatedRating;
    } catch (error) {
      this.logger.error(`Failed to update rating with ID ${id}: ${error.message}`);
      throw error instanceof HttpException
        ? error
        : new HttpException('Failed to update rating', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<{ message: string; id: number }> {
    try {
      const rowsDeleted = await this.ratingModel.destroy({ where: { id } });

      if (rowsDeleted === 0) {
        this.logger.warn(`Rating with ID ${id} not found for deletion`);
        throw new HttpException('Rating not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Deleted rating with ID ${id}`);
      return { message: 'Rating deleted successfully', id };
    } catch (error) {
      this.logger.error(`Failed to delete rating with ID ${id}: ${error.message}`);
      throw error instanceof HttpException
        ? error
        : new HttpException('Failed to delete rating', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
