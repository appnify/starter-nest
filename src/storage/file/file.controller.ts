import { Respond, RespondType } from '@/middlewares/response';
import {
  Body,
  Controller,
  Delete,
  Get,
  Ip,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { UploadService } from './file.service';

@ApiTags('file')
@Controller('file')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: '要上传的文件', type: CreateFileDto })
  @ApiOperation({ description: '上传文件', operationId: 'addFile' })
  create(@UploadedFile() file: Express.Multer.File, @Req() req: Request, @Ip() ip: string) {
    return this.uploadService.create(file);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOperation({ description: '批量查询', operationId: 'getFiles' })
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: '查询', operationId: 'getFile' })
  findOne(@Param('id') id: number) {
    return this.uploadService.findOne(+id);
  }

  @Get('hash/:hash')
  @ApiOperation({ description: '根据哈希查询', operationId: 'getFileByHash' })
  getByHash(@Param('hash') hash: string) {
    return this.uploadService.getByHash(hash);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新', operationId: 'setFile' })
  update(@Param('id') id: number, @Body() updateFileDto: UpdateFileDto) {
    return this.uploadService.update(id, updateFileDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除', operationId: 'delFile' })
  remove(@Param('id') id: number) {
    return this.uploadService.remove(+id);
  }
}
