import { BaseController } from '@/common/base';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Option } from './entities/option.entity';
import { OptionService } from './option.service';

@ApiTags('option')
@Controller('options')
export class OptionController extends BaseController {
  constructor(private optionService: OptionService) {
    super();
  }

  @Post()
  @ApiOperation({ description: '新增选项', operationId: 'addOption' })
  addOption(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get()
  @ApiOkResponse({ isArray: true, type: Option })
  @ApiOperation({ description: '查询选项', operationId: 'getOptions' })
  getOptions() {
    return this.optionService.findMany();
  }

  @Get(':id')
  @ApiOperation({ description: '获取选项', operationId: 'getOption' })
  getOption(@Param('id') id: number): Promise<Option> {
    return this.optionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新选项', operationId: 'setOption' })
  updateOption(@Param('id') id: number, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.update(+id, updateOptionDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除选项', operationId: 'delOption' })
  delOption(@Param('id') id: number) {
    return this.optionService.remove(+id);
  }
}
