import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, ReturnUser } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly userRepo: Repository<User>;

  create(userDetails: CreateUserDto) {
    const newUser = this.userRepo.create({ ...userDetails });
    try {
      this.userRepo.save(newUser);
      return ReturnUser;
    } catch (error) {
      return error.message;
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneByOrFail({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  login(user: LoginUserDto) {
    return 'logged in';
  }
}
