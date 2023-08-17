import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto);
    if (createRoleDto.permissions) {
      role.permissions = createRoleDto.permissions.map((id) => ({ id })) as any;
    }
    await this.roleRepository.save(role);
    return role.id;
  }

  findAll() {
    return this.roleRepository.findAndCount({ relations: ['permissions'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException('角色不存在');
    }
    if (updateRoleDto.permissionIds) {
      const permissions = updateRoleDto.permissionIds.map((id) => ({ id }));
      await this.roleRepository.save({ id, permissions });
      delete updateRoleDto.permissionIds;
    }
    return this.roleRepository.update(id, updateRoleDto);
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
