import { BaseService } from '@/common/base';
import { uuid } from '@/libraries';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { In, Like, Repository } from 'typeorm';
import { RoleService } from '../role';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private roleService: RoleService) {
    super();
  }

  /**
   * 创建用户
   */
  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const user = this.userRepository.create(createUserDto);
    if (user.roles?.length) {
      user.roles = await this.roleService.findByIds(user.roleIds ?? []);
    }
    if (password) {
      const md5 = createHash('md5');
      user.salt = uuid();
      user.password = md5.update(password + user.salt).digest('hex');
    }
    const existed = await this.userRepository.findOne({ where: { username: user.username } });
    if (existed) {
      throw new Error('用户名已存在');
    }
    await this.userRepository.save(user);
    return user.id;
  }

  /**
   * 查找所有用户
   */
  async findMany(findUserdto: FindUserDto) {
    const { nickname: _nickname } = findUserdto;
    const nickname = _nickname ? Like(`%${_nickname}%`) : undefined;
    const { skip, take } = this.paginizate(findUserdto, { full: true });
    return this.userRepository.findAndCount({ skip, take, where: { nickname } });
  }

  /**
   * 根据id查找用户
   */
  async findOne(idOrOptions: number | Partial<User>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    const user = await this.userRepository.findOne({ where });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return user;
  }

  /**
   * 根据用户id
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    const { roleIds } = updateUserDto;
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    if (roleIds) {
      user.roles = await this.roleService.findByIds(roleIds);
      delete updateUserDto.roleIds;
    }
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
  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  /**
   * 根据用户id查找用户权限
   */
  async findUserPermissions(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (user) {
      const permissions = user.roles.flatMap((role) => 1);
      return [...new Set(permissions.map((i) => i))];
    }
    return [];
  }

  async removeMany(ids: number[]) {
    if (!ids.length) {
      return 0;
    }
    const res = await this.userRepository.softDelete(ids);
    return res.affected;
  }
}
