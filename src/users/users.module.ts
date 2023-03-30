import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.entities';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
