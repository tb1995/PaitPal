import { Users } from '@/users/users.entities';
import { UsersService } from '@/users/users.service';
import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geometry, Repository } from 'typeorm';
import { Restaurants } from './restaurants.entities';
import { Request, Express } from 'express';
import { Point } from 'geojson';
import { Multer } from 'multer';
import { S3Service } from '@/s3/s3.service';

@Injectable()
export class RestaurantsService {
  @InjectRepository(Restaurants)
  private readonly restaurantRepo: Repository<Restaurants>;

  @Inject()
  private userService: UsersService;

  @Inject()
  private s3Service: S3Service;

  create(name: string, longitude: number, latitude: number, req: Request) {
    const user: Users = <Users>req.user;
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    let location1: Point = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    return this.restaurantRepo
      .createQueryBuilder()
      .insert()
      .into(Restaurants)
      .values([
        {
          name: name,
          location: () => `ST_GeomFromText('POINT(${latitude} ${longitude})')`, //
          user: user,
        },
      ])
      .execute();
  }

  async findOne(id: number): Promise<Restaurants> {
    const restaurant = await this.restaurantRepo.findOneBy({ id });

    if (!restaurant) {
      throw new NotFoundException('Could not find User');
    }
    return restaurant;
  }

  async addPhoto(
    restaurantId: number,
    file: Express.Multer.File,
    req: Request
  ) {
    //
    const user: Users = <Users>req.user;
    const restaurant = await this.findOne(restaurantId);

    console.log(restaurant);
    const key = `${file.filename}${Date.now()}`;

    const imageUrl = await this.s3Service.uploadFile(file, key);

    await this.restaurantRepo.update({ id: restaurantId }, { photo: imageUrl });
  }
}
