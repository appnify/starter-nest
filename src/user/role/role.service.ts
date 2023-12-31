import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(role);
    return role.id;
  }

  findAll() {
    return this.roleRepository.findAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('角色不存在');
    }
    return this.roleRepository.update(id, updateRoleDto);
  }

  /**
   * 根据ID数组查找角色
   * @param ids ID数组
   * @returns
   */
  findByIds(ids: number[]) {
    return this.roleRepository.find({ where: { id: In(ids) } });
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
