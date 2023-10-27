import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDictTypeDto } from './dto/create-dictType.dto';
import { FindDictTypeDto } from './dto/find-dictType.dto';
import { UpdateDictTypeDto } from './dto/update-dictType.dto';
import { DictType } from './entities/dictType.entity';

@Injectable()
export class DictTypeService extends BaseService {
  constructor(@InjectRepository(DictType) private dictTypeRepository: Repository<DictType>) {
    super();
  }

  /**
   * 新增字典类型
   */
  async create(createDictTypeDto: CreateDictTypeDto) {
    const dictType = this.dictTypeRepository.create(createDictTypeDto);
    await this.dictTypeRepository.save(dictType);
    return dictType.id;
  }

  /**
   * 条件/分页查询
   */
  async findMany(findDictTypedto: FindDictTypeDto) {
    const { page, size } = findDictTypedto;
    const { skip, take } = this.formatPagination(page, size, true);
    return this.dictTypeRepository.findAndCount({ skip, take });
  }

  /**
   * 根据ID查询
   */
  findOne(idOrOptions: number | Partial<DictType>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    return this.dictTypeRepository.findOne({ where });
  }

  /**
   * 根据ID更新
   */
  update(id: number, updateDictTypeDto: UpdateDictTypeDto) {
    return this.dictTypeRepository.update(id, updateDictTypeDto);
  }

  /**
   * 根据ID删除(软删除)
   */
  remove(id: number) {
    return this.dictTypeRepository.softDelete(id);
  }
}
