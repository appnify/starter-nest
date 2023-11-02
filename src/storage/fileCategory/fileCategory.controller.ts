import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/middlewares/response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFileCategoryDto } from './dto/create-fileCategory.dto';
import { FindFileCategoryDto } from './dto/find-fileCategory.dto';
import { UpdateFileCategoryDto } from './dto/update-fileCategory.dto';
import { FileCategory } from './entities/fileCategory.entity';
import { FileCategoryService } from './fileCategory.service';

@ApiTags('fileCategory')
@Controller('fileCategorys')
export class FileCategoryController extends BaseController {
  constructor(private fileCategoryService: FileCategoryService) {
    super();
  }

  @Post()
  @ApiOperation({ description: '新增文件分类', operationId: 'addFileCategory' })
  addFileCategory(@Body() createFileCategoryDto: CreateFileCategoryDto) {
    return this.fileCategoryService.create(createFileCategoryDto);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOkResponse({ isArray: true, type: FileCategory })
  @ApiOperation({ description: '查询文件分类', operationId: 'getFileCategorys' })
  getFileCategorys(@Query() query: FindFileCategoryDto) {
    return this.fileCategoryService.findMany(query);
  }

  @Get(':id')
  @ApiOperation({ description: '获取文件分类', operationId: 'getFileCategory' })
  getFileCategory(@Param('id') id: number): Promise<FileCategory> {
    return this.fileCategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新文件分类', operationId: 'setFileCategory' })
  updateFileCategory(@Param('id') id: number, @Body() updateFileCategoryDto: UpdateFileCategoryDto) {
    return this.fileCategoryService.update(+id, updateFileCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除文件分类', operationId: 'delFileCategory' })
  delFileCategory(@Param('id') id: number) {
    return this.fileCategoryService.remove(+id);
  }
}
