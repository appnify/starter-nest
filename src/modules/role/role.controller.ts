import { Respond, RespondType } from '@/common/response';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@ApiTags('role')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ description: '创建角色', operationId: 'addRole' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOperation({ description: '批量查询角色', operationId: 'getRoles' })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: '查询角色', operationId: 'getRole' })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新角色', operationId: 'updateRole' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除角色', operationId: 'delRole' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
