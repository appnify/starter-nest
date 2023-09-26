import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extname, posix, sep, relative } from 'path';
import { Repository } from 'typeorm';
import { Upload } from './entities/upload.entity';
import { BaseService } from '@/common/base';

@Injectable()
export class UploadService extends BaseService {
  constructor(@InjectRepository(Upload) private readonly uploadRepository: Repository<Upload>) {
    super();
  }

  /**
   * 保存文件信息
   * @param file 文件信息
   * @returns
   */
  async create(file: Express.Multer.File) {
    const path = relative(this.config.uploadDir, file.path).split(sep).join(posix.sep);
    const uploadPrefix = this.config.uploadPrefix;
    const uploadUrl = `${uploadPrefix}/${path}`;
    const upload = this.uploadRepository.create({
      name: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      hash: file.filename,
      path: uploadUrl,
      extension: extname(file.originalname),
    });
    await this.uploadRepository.save(upload);
    return upload.id;
  }

  findAll() {
    return this.uploadRepository.findAndCount();
  }

  findOne(id: number) {
    return this.uploadRepository.findOne({ where: { id } });
  }

  update() {
    return `This action updates a #${1} upload`;
  }

  remove(id: number) {
    return this.uploadRepository.softDelete(id);
  }
}
