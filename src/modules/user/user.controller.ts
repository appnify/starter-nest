import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/common/response';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('users')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  /**
   * 新增用户
   */
  @Post()
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * 分页/条件查询用户
   */
  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ type: User, isArray: true })
  async getUsers(@Query() query: FindUserDto) {
    return this.userService.findMany(query);
  }

  /**
   * 根据ID查询用户
   */
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  /**
   * 根据ID更新用户
   */
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  /**
   * 根据ID删除用户
   */
  @Delete(':id')
  delUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
}
