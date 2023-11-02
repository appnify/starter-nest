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
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileService } from './file.service';
import { FindFileDto } from './dto/find-file.dto';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: '要上传的文件', type: CreateFileDto })
  @ApiOperation({ description: '上传文件', operationId: 'addFile' })
  create(@UploadedFile() file: Express.Multer.File, @Req() req: Request, @Ip() ip: string) {
    return this.fileService.create(file);
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOperation({ description: '批量查询', operationId: 'getFiles' })
  findMany(@Query() findFileDto: FindFileDto) {
    return this.fileService.findMany(findFileDto);
  }

  @Get(':id')
  @ApiOperation({ description: '查询', operationId: 'getFile' })
  findOne(@Param('id') id: number) {
    return this.fileService.findOne(+id);
  }

  @Get('hash/:hash')
  @ApiOperation({ description: '根据哈希查询', operationId: 'getFileByHash' })
  getByHash(@Param('hash') hash: string) {
    return this.fileService.getByHash(hash);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新', operationId: 'setFile' })
  update(@Param('id') id: number, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(id, updateFileDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除', operationId: 'delFile' })
  remove(@Param('id') id: number) {
    return this.fileService.remove(+id);
  }

  @Delete()
  @ApiOperation({ description: '批量删除文件', operationId: 'delFiles' })
  removeMany(@Body() ids: number[]) {
    return this.fileService.removeMany(ids);
  }
}
