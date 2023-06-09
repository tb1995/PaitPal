import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@/users/users.entities';
import { Repository } from 'typeorm';
import { LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class AuthService {
  @InjectRepository(Users)
  private readonly repository: Repository<Users>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ): Promise<Users | never> {
    let user: Users = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = this.repository.create({
      email,
      password,
      username,
      firstName,
      lastName,
    });
    user.password = this.helper.encodePassword(password);

    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: Users = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }

  public async refresh(user: Users): Promise<string> {
    this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }
}
