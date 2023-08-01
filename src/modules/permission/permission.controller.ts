import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Respond } from '@/features/response';

@ApiTags('permission')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiOperation({ summary: '创建权限', operationId: 'addPermission' })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @Respond(Respond.PAGINATION)
  @ApiOperation({ summary: '批量查询权限', operationId: 'getPermissions' })
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '查询权限', operationId: 'getPermission' })
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新权限', operationId: 'updatePermission' })
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除权限', operationId: 'delPermission' })
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
