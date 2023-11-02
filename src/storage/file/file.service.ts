import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extname, relative, sep } from 'path';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { FindFileDto } from './dto/find-file.dto';
import { FileCategoryService } from '../fileCategory';

@Injectable()
export class FileService extends BaseService {
  constructor(
    @InjectRepository(File) private readonly repository: Repository<File>,
    private fileCategoryService: FileCategoryService,
  ) {
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

  findMany(findFileDto: FindFileDto) {
    const { page, size, name, categoryId } = findFileDto;
    const { skip, take } = this.formatPagination(page, size, true);
    const where: FindOptionsWhere<File> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }
    return this.repository.findAndCount({ skip, take, where });
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
  async update(id: number, updateFileDto: UpdateFileDto) {
    const { categoryId, ...rest } = updateFileDto;
    let category;
    if (categoryId) {
      category = await this.fileCategoryService.findOne(categoryId);
    }
    console.log(category);
    return this.repository.update(id, { ...rest, category });
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

  /**
   * 批量删除文件
   * @param ids ID数组
   * @returns
   */
  removeMany(ids: number[]) {
    return this.repository.softDelete(ids);
  }
}
