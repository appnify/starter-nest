import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: '创建文章', operationId: 'addPost' })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: '批量查询文章', operationId: 'getPosts' })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '查询文章', operationId: 'getPost' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新文章', operationId: 'updatePost' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章', operationId: 'delPost' })
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
