import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/common/base';
import { FindPostDto } from './dto/find-post.dto';

@Injectable()
export class PostService extends BaseService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {
    super();
  }

  async create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    await this.postRepository.save(post);
    return post.id;
  }

  findAll(findPostDto: FindPostDto) {
    const { skip, take } = this.formatPagination(findPostDto.page, findPostDto.size);
    return this.postRepository.findAndCount({ skip, take });
  }

  findOne(id: number) {
    return this.postRepository.findOneOrFail({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.softDelete(id);
  }
}
