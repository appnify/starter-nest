import { Respond } from '@/common/response';
import { Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UploadService } from './upload.service';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: '要上传的文件', type: CreateUploadDto })
  @ApiOperation({ description: '上传文件', operationId: 'upload' })
  create(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.create(file);
  }

  @Get()
  @Respond(Respond.PAGINATION)
  @ApiOperation({ description: '批量查询', operationId: 'getUploads' })
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: '查询', operationId: 'getUpload' })
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新', operationId: 'updateUpload' })
  update() {
    return this.uploadService.update();
  }

  @Delete(':id')
  @ApiOperation({ description: '删除', operationId: 'delUpload' })
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
