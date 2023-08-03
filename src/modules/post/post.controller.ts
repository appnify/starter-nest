import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Response } from 'express';
import { BaseController } from '@/common/base';
import { Respond, RespondType } from '@/common/response';
import { FindPostDto } from './dto/find-post.dto';

@ApiTags('post')
@Controller('posts')
export class PostController extends BaseController {
  constructor(private readonly postService: PostService) {
    super();
  }

  @Post()
  @ApiOperation({ description: '创建文章', operationId: 'addPost' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get('template.xlsx')
  @ApiOperation({ description: '获取文章下载模板', operationId: 'getPostTemplate' })
  getTemplate(@Res() res: Response) {
    try {
      const filePath = join(process.cwd(), './content/template/模板1.xlsx');
      res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.attachment('模板1.xlsx');
      // res.sendFile(filePath);
      res.send(readFileSync(filePath));
    } catch (e) {
      throw new NotFoundException('模板不存在');
    }
  }

  @Get()
  @Respond(RespondType.PAGINATION)
  @ApiOperation({ description: '批量查询文章', operationId: 'getPosts' })
  findAll(@Query() findPostDto: FindPostDto) {
    return this.postService.findAll(findPostDto);
  }

  @Get(':id')
  @ApiOperation({ description: '查询文章', operationId: 'getPost' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ description: '更新文章', operationId: 'updatePost' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除文章', operationId: 'delPost' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(+id);
  }
}
