import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(@InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = this.permissionRepository.create(createPermissionDto);
    await this.permissionRepository.save(permission);
    return permission.id;
  }

  findAll() {
    return this.permissionRepository.findAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionRepository.update(id, updatePermissionDto);
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
