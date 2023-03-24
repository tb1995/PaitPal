import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from '../users/dtos/user.dto';

import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize-interceptor';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    this.usersService.create(
      body.email,
      body.password,
      body.username,
      body.firstName,
      body.lastName
    );
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findUserByUsername(@Query('username') username: string) {
    return this.usersService.find(username);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
