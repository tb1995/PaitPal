import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { Restaurants } from './restaurants.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/users/auth/auth.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurants]), AuthModule, UsersModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
