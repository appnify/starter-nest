import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Version } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Respond } from '@/features/response';
import { BaseController } from '@/features/base';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './entities';
import { UserService } from './user.service';
import { Permission, PermissionEnum } from '@/features/permission/permission.decorator';
import { Public } from '@/modules/auth/jwt/jwt-decorator';

@ApiTags('user')
@Controller('users')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: '创建用户', operationId: 'addUser' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Public(false)
  @Respond(Respond.PAGINATION)
  @Permission(PermissionEnum.READ)
  @ApiOkResponse({ isArray: true, type: User })
  @ApiOperation({ summary: '批量查询', operationId: 'getUsers' })
  async findMany(@Query() query: FindUserDto) {
    return this.userService.findMany(query);
  }

  @Version('2')
  @Get(':id')
  @ApiOperation({ summary: '查询用户', operationId: 'getUserv2' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户', operationId: 'setUser' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户', operationId: 'delUser' })
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
