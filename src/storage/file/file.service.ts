import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extname, relative, sep } from 'path';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { FindFileDto } from './dto/find-file.dto';
import { FileCategoryService } from '../fileCategory';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { getTypeByMimetype } from './util';

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
    const { originalname: name, mimetype, size } = uploadFile;
    const { uploadDir, uploadPrefix } = this.config;
    const relativePath = relative(uploadDir, uploadFile.path).split(sep).join('/');
    const path = `${uploadPrefix}/${relativePath}`;
    const extension = extname(uploadFile.originalname);
    const description = '';
    const hash = await this.hashByFilePath(uploadFile.path);
    const type = getTypeByMimetype(mimetype)
    const file = this.repository.create({
      name,
      type,
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

  /**
   * 从文件路径读取流，进行MD5哈希
   * @param path 文件路径
   * @returns
   */
  hashByFilePath(path: string): Promise<string> {
    const hash = createHash('md5');
    const stream = createReadStream(path);
    return new Promise((res, rej) => {
      stream.on('data', (chunk) => {
        hash.update(chunk);
      });
      stream.on('end', () => {
        res(hash.digest('hex'));
      });
      stream.on('error', () => {
        rej('获取文件哈希值失败');
      });
    });
  }

  async findMany(findFileDto: FindFileDto) {
    const { page, size, name, categoryId } = findFileDto;
    const { skip, take } = this.formatPagination(page, size, true);
    const where: FindOptionsWhere<File> = {};
    if (name) {
      where.name = Like(`%${name}%`);
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }
    return this.repository.findAndCount({
      skip,
      take,
      where,
      relations: {
        category: true,
      },
      select: {
        category: {
          id: true,
          name: true,
        },
      },
    });
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
