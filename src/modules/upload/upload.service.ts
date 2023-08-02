import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'path';
import { Repository } from 'typeorm';
import { Upload } from './entities/upload.entity';

@Injectable()
export class UploadService {
  constructor(@InjectRepository(Upload) private readonly uploadRepository: Repository<Upload>) {}

  async create(file: Express.Multer.File) {
    const upload = this.uploadRepository.create({
      name: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      hash: file.filename,
      path: file.path,
      extension: parse(file.originalname).ext,
    });
    await this.uploadRepository.save(upload);
    return upload.id;
  }

  findAll() {
    return this.uploadRepository.findAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update() {
    return `This action updates a #${1} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
