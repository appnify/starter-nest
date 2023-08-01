import { Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Respond } from '@/features/response';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '上传文件', operationId: 'upload' })
  create(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.create(file);
  }

  @Get()
  @Respond(Respond.PAGINATION)
  @ApiOperation({ summary: '批量查询', operationId: 'getUploads' })
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '查询', operationId: 'getUpload' })
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新', operationId: 'updateUpload' })
  update() {
    return this.uploadService.update();
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除', operationId: 'delUpload' })
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
