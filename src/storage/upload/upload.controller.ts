import { Respond, RespondType } from '@/common/response';
import { Controller, Delete, Get, Ip, Param, Patch, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UploadService } from './upload.service';
import { Request } from 'express';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: '要上传的文件', type: CreateUploadDto })
  @ApiOperation({ description: '上传文件', operationId: 'addFile' })
  create(@UploadedFile() file: Express.Multer.File, @Req() req: Request, @Ip() ip: string) {
    return this.uploadService.create(file);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOperation({ description: '批量查询', operationId: 'getUploads' })
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: '查询', operationId: 'getFile' })
  findOne(@Param('id') id: number) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新', operationId: 'updateFile' })
  update() {
    return this.uploadService.update();
  }

  @Delete(':id')
  @ApiOperation({ description: '删除', operationId: 'delFile' })
  remove(@Param('id') id: number) {
    return this.uploadService.remove(+id);
  }
}
