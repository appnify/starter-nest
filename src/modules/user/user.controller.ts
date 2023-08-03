import { BaseController } from '@/common/base';
import { Respond } from '@/common/response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Version } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('users')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  @Post()
  @ApiOperation({ description: '创建用户', operationId: 'addUser' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Respond(Respond.PAGINATION)
  @ApiOkResponse({ isArray: true, type: User })
  @ApiOperation({ description: '批量查询用户', operationId: 'getUsers' })
  async findMany(@Query() query: FindUserDto) {
    return this.userService.findMany(query);
  }

  @Get(':id')
  @Version('2')
  @ApiOperation({ deprecated: true, description: '查询用户', operationId: 'getUserv2' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新用户', operationId: 'updateUser' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除用户', operationId: 'deleteUser' })
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
