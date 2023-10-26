import { BaseService } from '@/common/base';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RoleService } from '../role';
import { uuid } from '@/libraries';
import { createHash } from 'crypto';

@Injectable()
export class UserService extends BaseService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private roleService: RoleService) {
    super();
  }

  /**
   * 创建用户
   */
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    user.roles = await this.roleService.findByIds(user.roleIds ?? []);
    const { password } = createUserDto;
    if (password) {
      const salt = uuid();
      const md5 = createHash('md5');
      const pass = md5.update(password + salt).digest('hex');
      user.salt = salt;
      user.password = pass;
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
  findOne(idOrOptions: number | Partial<User>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    return this.userRepository.findOne({ where });
  }

  /**
   * 根据用户id
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    if (updateUserDto.roleIds) {
      const roles = updateUserDto.roleIds.map((id) => ({ id }));
      await this.userRepository.save({ id, roles });
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
      relations: ['roles', 'roles.permissions'],
    });
    if (user) {
      const permissions = user.roles.flatMap((role) => role.permissions);
      return [...new Set(permissions.map((i) => i.slug))];
    }
    return [];
  }
}
