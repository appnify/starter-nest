import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/middlewares/response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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
  @ApiOperation({ description: '添加用户', operationId: 'addUser' })
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ type: User, isArray: true })
  @ApiOperation({ description: '分页获取用户', operationId: 'getUsers' })
  async getUsers(@Query() query: FindUserDto) {
    return this.userService.findMany(query);
  }

  @Get(':id')
  @ApiOperation({ description: '获取用户', operationId: 'getUser' })
  getUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新用户', operationId: 'setUser' })
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除用户', operationId: 'delUser' })
  delUser(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
