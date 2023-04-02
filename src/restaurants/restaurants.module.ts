import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { Restaurants } from './restaurants.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/users/auth/auth.module';
import { UsersModule } from '@/users/users.module';
import { S3Module } from '@/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurants]),
    AuthModule,
    UsersModule,
    S3Module,
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
