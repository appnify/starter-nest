import { Injectable } from '@nestjs/common';
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

<<<<<<< HEAD
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    if (updateRoleDto.permissions) {
      delete updateRoleDto.permissions;
    }
    await this.roleRepository.update(id, updateRoleDto);
=======
  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
>>>>>>> 1a32173fc73bbb94906f9ffde5874d47f6dfdad8
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
