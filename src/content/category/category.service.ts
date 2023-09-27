import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService extends BaseService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {
    super();
  }

  /**
   * 新增分类
   */
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return category.id;
  }

  /**
   * 条件/分页查询
   */
  async findMany(findCategorydto: FindCategoryDto) {
    const { page, size } = findCategorydto;
    const { skip, take } = this.formatPagination(page, size, true);
    return this.categoryRepository.findAndCount({ skip, take });
  }

  /**
   * 根据ID查询
   */
  findOne(idOrOptions: number | Partial<Category>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    return this.categoryRepository.findOne({ where });
  }

  /**
   * 根据ID更新
   */
  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  /**
   * 根据ID删除(软删除)
   */
  remove(id: number) {
    return this.categoryRepository.softDelete(id);
  }
}
