import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entities';
import { create } from 'domain';
import { stringify } from 'querystring';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}

  create(
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ) {
    const user = this.repo.create({
      email,
      password,
      username,
      firstName,
      lastName,
    });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Could not find User');
    }
    return user;
  }

  find(username: string) {
    return this.repo.find({ where: { username } });
  }

  async update(id: number, attrs: Partial<Users>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
