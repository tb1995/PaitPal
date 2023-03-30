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
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from '../users/dtos/user.dto';

import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize-interceptor';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/auth.dto';
import { JwtAuthGuard } from './auth/auth.guard';
import { Users } from './users.entities';
import { Request } from 'express';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    this.authService.register(
      body.email,
      body.password,
      body.username,
      body.firstName,
      body.lastName
    );
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.authService.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() { user }: Request): Promise<string | never> {
    return this.authService.refresh(<Users>user);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findUserByUsername(@Query('username') username: string) {
    return this.usersService.find(username);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateUser(@Body() body: UpdateUserDto, @Req() req: Request) {
    // console.log(req);
    return this.usersService.update(body, req);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
