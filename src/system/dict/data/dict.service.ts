import { BaseService } from '@/common/base';
import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDictDto } from './dto/create-dict.dto';
import { FindDictDto } from './dto/find-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { Dict } from './entities/dict.entity';
import { DictTypeService } from '../dictType';

@Injectable()
export class DictService extends BaseService {
  constructor(
    @InjectRepository(Dict) private dictRepository: Repository<Dict>,
    @Inject(forwardRef(() => DictTypeService)) private dictTypeService: DictTypeService,
  ) {
    super();
  }

  /**
   * 新增字典
   */
  async create(createDictDto: CreateDictDto) {
    const dict = this.dictRepository.create(createDictDto);
    const { typeId } = createDictDto;
    const type = await this.dictTypeService.findOne(typeId);
    if (!type) {
      throw new NotFoundException('字典类型不存在');
    }
    dict.type = type;
    await this.dictRepository.save(dict);
    return dict.id;
  }

  /**
   * 条件/分页查询
   */
  async findMany(findDictdto: FindDictDto) {
    const { page, size, typeId } = findDictdto;
    const { skip, take } = this.formatPagination(page, size, true);
    return this.dictRepository.findAndCount({ skip, take, where: { typeId } });
  }

  /**
   * 根据ID查询
   */
  findOne(idOrOptions: number | Partial<Dict>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    return this.dictRepository.findOne({ where });
  }

  /**
   * 根据ID更新
   */
  update(id: number, updateDictDto: UpdateDictDto) {
    return this.dictRepository.update(id, updateDictDto);
  }

  /**
   * 根据ID删除(软删除)
   */
  remove(id: number) {
    return this.dictRepository.softDelete(id);
  }
}
