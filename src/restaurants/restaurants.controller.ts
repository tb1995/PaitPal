import { JwtAuthGuard } from '@/users/auth/auth.guard';
import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { Multer } from 'multer';
import { Request, Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateRestaurantDto, @Req() req: Request) {
    this.restaurantsService.create(
      body.name,
      body.longitude,
      body.latitude,
      req
    );
  }

  @Post('/:id/photo')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  addPhoto(
    @Param('id') restaurantId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    console.log(file);

    this.restaurantsService.addPhoto(parseInt(restaurantId), file, req);
  }
}
