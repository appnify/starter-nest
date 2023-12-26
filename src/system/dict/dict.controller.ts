import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/middlewares/response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDictDto } from './dto/create-dict.dto';
import { FindDictDto } from './dto/find-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { Dict } from './entities/dict.entity';
import { DictService } from './dict.service';

@ApiTags('dict')
@Controller('dicts')
export class DictController extends BaseController {
  constructor(private dictService: DictService) {
    super();
  }

  @Post()
  @ApiOperation({ description: '新增字典', operationId: 'addDict' })
  addDict(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ isArray: true, type: Dict })
  @ApiOperation({ description: '查询字典', operationId: 'getDicts' })
  getDicts(@Query() query: FindDictDto) {
    return this.dictService.findMany(query);
  }

  @Get(':id')
  @ApiOperation({ description: '获取字典', operationId: 'getDict' })
  getDict(@Param('id') id: number): Promise<Dict> {
    return this.dictService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新字典', operationId: 'setDict' })
  updateDict(@Param('id') id: number, @Body() updateDictDto: UpdateDictDto) {
    return this.dictService.update(+id, updateDictDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除字典', operationId: 'delDict' })
  delDict(@Param('id') id: number) {
    return this.dictService.remove(+id);
  }
}
