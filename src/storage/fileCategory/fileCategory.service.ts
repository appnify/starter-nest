import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateFileCategoryDto } from './dto/create-fileCategory.dto';
import { FindFileCategoryDto } from './dto/find-fileCategory.dto';
import { UpdateFileCategoryDto } from './dto/update-fileCategory.dto';
import { FileCategory } from './entities/fileCategory.entity';

@Injectable()
export class FileCategoryService extends BaseService {
  constructor(@InjectRepository(FileCategory) private fileCategoryRepository: Repository<FileCategory>) {
    super();
  }

  /**
   * 新增文件分类
   */
  async create(createFileCategoryDto: CreateFileCategoryDto) {
    const fileCategory = this.fileCategoryRepository.create(createFileCategoryDto);
    await this.fileCategoryRepository.save(fileCategory);
    return fileCategory.id;
  }

  /**
   * 条件/分页查询
   */
  async findMany(findFileCategorydto: FindFileCategoryDto) {
    const { page, size } = findFileCategorydto;
    const { skip, take } = this.formatPagination(page, size, true);
    return this.fileCategoryRepository.findAndCount({ skip, take });
  }

  /**
   * 根据ID查询
   */
  findOne(idOrOptions: number | Partial<FileCategory>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    return this.fileCategoryRepository.findOne({ where });
  }

  /**
   * 根据ID更新
   */
  update(id: number, updateFileCategoryDto: UpdateFileCategoryDto) {
    return this.fileCategoryRepository.update(id, updateFileCategoryDto);
  }

  /**
   * 根据ID删除(软删除)
   */
  remove(id: number) {
    return this.fileCategoryRepository.softDelete(id);
  }
}
