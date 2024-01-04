import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/middlewares/response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateShorturlDto } from './dto/create-shorturl.dto';
import { FindShorturlDto } from './dto/find-shorturl.dto';
import { UpdateShorturlDto } from './dto/update-shorturl.dto';
import { Shorturl } from './entities/shorturl.entity';
import { ShorturlService } from './shorturl.service';

@ApiTags('shorturl')
@Controller('shorturls')
export class ShorturlController extends BaseController {
  constructor(private shorturlService: ShorturlService) {
    super();
  }

  @Post()
  @ApiOperation({ description: '新增短链', operationId: 'addShorturl' })
  addShorturl(@Body() createShorturlDto: CreateShorturlDto) {
    return this.shorturlService.create(createShorturlDto);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ isArray: true, type: Shorturl })
  @ApiOperation({ description: '查询短链', operationId: 'getShorturls' })
  getShorturls(@Query() query: FindShorturlDto) {
    return this.shorturlService.findMany(query);
  }

  @Get(':id')
  @ApiOperation({ description: '获取短链', operationId: 'getShorturl' })
  getShorturl(@Param('id') id: number): Promise<Shorturl> {
    return this.shorturlService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新短链', operationId: 'setShorturl' })
  updateShorturl(@Param('id') id: number, @Body() updateShorturlDto: UpdateShorturlDto) {
    return this.shorturlService.update(+id, updateShorturlDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除短链', operationId: 'delShorturl' })
  delShorturl(@Param('id') id: number) {
    return this.shorturlService.remove(+id);
  }
}
