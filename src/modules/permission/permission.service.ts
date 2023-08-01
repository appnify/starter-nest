import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

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
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
