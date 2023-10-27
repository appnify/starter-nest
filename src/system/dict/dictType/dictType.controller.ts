import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/middlewares/response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDictTypeDto } from './dto/create-dictType.dto';
import { FindDictTypeDto } from './dto/find-dictType.dto';
import { UpdateDictTypeDto } from './dto/update-dictType.dto';
import { DictType } from './entities/dictType.entity';
import { DictTypeService } from './dictType.service';

@ApiTags('dictType')
@Controller('dictTypes')
export class DictTypeController extends BaseController {
  constructor(private dictTypeService: DictTypeService) {
    super();
  }

  @Post()
  @ApiOperation({ description: '新增字典类型', operationId: 'addDictType' })
  addDictType(@Body() createDictTypeDto: CreateDictTypeDto) {
    return this.dictTypeService.create(createDictTypeDto);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ isArray: true, type: DictType })
  @ApiOperation({ description: '查询字典类型', operationId: 'getDictTypes' })
  getDictTypes(@Query() query: FindDictTypeDto) {
    return this.dictTypeService.findMany(query);
  }

  @Get(':id')
  @ApiOperation({ description: '获取字典类型', operationId: 'getDictType' })
  getDictType(@Param('id') id: number): Promise<DictType> {
    return this.dictTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新字典类型', operationId: 'setDictType' })
  updateDictType(@Param('id') id: number, @Body() updateDictTypeDto: UpdateDictTypeDto) {
    return this.dictTypeService.update(+id, updateDictTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除字典类型', operationId: 'delDictType' })
  delDictType(@Param('id') id: number) {
    return this.dictTypeService.remove(+id);
  }
}
