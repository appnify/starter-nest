import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/middlewares/response';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLogDto } from './dto/create-log.dto';
import { FindLogDto } from './dto/find-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LoginLog } from './entities/loginLog.entity';
import { LogService } from './log.service';

@ApiTags('log')
@Controller('logs')
export class LogController extends BaseController {
  constructor(private logService: LogService) {
    super();
  }

  /**
   * 新增日志管理
   */
  @Post()
  addLog(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  /**
   * 根据分页/过滤参数查询日志管理
   */
  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ isArray: true, type: LoginLog })
  getLogs(@Query() query: FindLogDto) {
    return this.logService.findMany(query);
  }

  @Get('login')
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ isArray: true, type: LoginLog })
  @ApiOperation({ description: '分页查询登陆日志', operationId: 'getLoginLogs' })
  getLoginLogs(@Query() query: FindLogDto) {
    return this.logService.findMany(query);
  }

  /**
   * 根据ID查询日志管理
   */
  @Get(':id')
  getLog(@Param('id', ParseIntPipe) id: number): Promise<LoginLog> {
    return this.logService.findOne(id);
  }

  /**
   * 根据ID更新日志管理
   */
  @Patch(':id')
  updateLog(@Param('id', ParseIntPipe) id: number, @Body() updateLogDto: UpdateLogDto) {
    return this.logService.update(+id, updateLogDto);
  }

  /**
   * 根据ID删除日志管理
   */
  @Delete(':id')
  delLog(@Param('id', ParseIntPipe) id: number) {
    return this.logService.remove(+id);
  }
}
