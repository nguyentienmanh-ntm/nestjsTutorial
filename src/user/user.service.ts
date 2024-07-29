import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createUser(requestBody: createUserDto) {
    const user = this.usersRepository.create(requestBody);

    return this.usersRepository.save(user);
  }

  getAllUsers() {
    return this.usersRepository.find();
  }

  getOneUser(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async UpdateById(id: number, requestBody: updateUserDto) {
    let user = await this.getOneUser(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    user = { ...user, ...requestBody };

    return this.usersRepository.save(user);
  }

  async deleteById(id: number) {
    const user = await this.getOneUser(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return this.usersRepository.remove(user);
  }
}
