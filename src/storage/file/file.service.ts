import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extname, relative, sep } from 'path';
import { Repository } from 'typeorm';
import { Upload } from './entities/file.entity';

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
    const path = relative(this.config.uploadDir, file.path).split(sep).join('/');
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
    return upload;
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

  /**
   * 根据哈希判断文件是否存在
   * @param hash 哈希
   * @returns
   */
  async isHashExists(hash: string) {
    const count = await this.uploadRepository.count({ where: { hash } });
    return count > 0;
  }

  remove(id: number) {
    return this.uploadRepository.softDelete(id);
  }
}
