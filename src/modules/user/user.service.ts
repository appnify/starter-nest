import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/features';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  /**
   * 创建用户
   */
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user.id;
  }

  /**
   * 查找所有用户
   */
  async findAll(dto: FindUserDto) {
    const options = Pagination.optionize(dto);
    return this.userRepository.findAndCount({ ...options, order: { createdAt: 'DESC' } });
  }

  /**
   * 根据id查找用户
   */
  findOne(idOrOptions: number | Partial<User>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : idOrOptions;
    return this.userRepository.findOne({ where });
  }

  /**
   * 根据用户id
   */
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  /**
   * 根据id删除用户
   */
  remove(id: number) {
    return this.userRepository.softDelete(id);
  }

  /**
   * 根据用户名查找用户
   */
  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
