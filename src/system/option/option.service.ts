import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Option } from './entities/option.entity';

@Injectable()
export class OptionService extends BaseService {
  constructor(@InjectRepository(Option) private optionRepository: Repository<Option>) {
    super();
  }

  /**
   * 新增选项
   */
  async create(createOptionDto: CreateOptionDto) {
    const option = this.optionRepository.create(createOptionDto);
    await this.optionRepository.save(option);
    return option.id;
  }

  /**
   * 条件/分页查询
   */
  async findMany() {
    return this.optionRepository.find();
  }

  /**
   * 根据ID查询
   */
  findOne(idOrOptions: number | Partial<Option>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    return this.optionRepository.findOne({ where });
  }

  /**
   * 根据ID更新
   */
  update(id: number, updateOptionDto: UpdateOptionDto) {
    return this.optionRepository.update(id, updateOptionDto);
  }

  /**
   * 根据ID删除(软删除)
   */
  remove(id: number) {
    return this.optionRepository.softDelete(id);
  }
}
