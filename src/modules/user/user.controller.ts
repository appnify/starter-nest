import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController, Pagination } from 'src/features';
import { Public } from '../auth/jwt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './entities';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('users')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @Post()
  @ApiOperation({ summary: '创建用户', operationId: 'createUser' })
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    createUserDto.avatar = `upload/${file.filename}`;
    console.log(createUserDto, file);
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  @ApiOkResponse({ isArray: true, type: User })
  @ApiOperation({ summary: '批量查询', operationId: 'selectUsers' })
  async findMany(@Query() query: FindUserDto) {
    const [data, total] = await this.userService.findAll(query);
    const { page, size } = query;
    return Pagination.wrap({ page, size, total, data });
  }

  @Version('2')
  @Get(':id')
  @ApiOperation({ summary: '查询用户', operationId: 'selectUserv2' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户', operationId: 'updateUser' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户', operationId: 'deleteUser' })
  remove(@Param('id') id: number) {
    return this.userService.remove(+id);
  }
}
