import { Respond, RespondType } from '@/common/response';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';

@ApiTags('permission')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiOperation({ description: '创建权限', operationId: 'addPermission' })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOperation({ description: '批量查询权限', operationId: 'getPermissions' })
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: '查询权限', operationId: 'getPermission' })
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新权限', operationId: 'updatePermission' })
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除权限', operationId: 'delPermission' })
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
