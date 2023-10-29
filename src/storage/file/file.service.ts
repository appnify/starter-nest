import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extname, relative, sep } from 'path';
import { Repository } from 'typeorm';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class UploadService extends BaseService {
  constructor(@InjectRepository(File) private readonly repository: Repository<File>) {
    super();
  }

  /**
   * 保存文件信息
   * @param uploadFile 文件信息
   * @returns
   */
  async create(uploadFile: Express.Multer.File) {
    const { originalname: name, mimetype, size, path: hash } = uploadFile;
    const relativePath = relative(this.config.uploadDir, uploadFile.path).split(sep).join('/');
    const path = `${this.config.uploadPrefix}/${relativePath}`;
    const extension = extname(uploadFile.originalname);
    const description = '';
    const file = this.repository.create({
      name,
      mimetype,
      size,
      hash,
      path,
      extension,
      description,
    });
    await this.repository.save(file);
    return file.id;
  }

  findAll() {
    return this.repository.findAndCount();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  /**
   * 更新文件信息
   * @param id 文件ID
   * @param updateFileDto 更新信息
   * @returns 
   */
  update(id: number, updateFileDto: UpdateFileDto) {
    return this.repository.update(id, updateFileDto);
  }

  /**
   * 根据哈希判断文件是否存在
   * @param hash 哈希
   * @returns
   */
  async getByHash(hash: string) {
    return this.repository.findOneBy({ hash });
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
