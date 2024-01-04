import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateShorturlDto } from './dto/create-shorturl.dto';
import { FindShorturlDto } from './dto/find-shorturl.dto';
import { UpdateShorturlDto } from './dto/update-shorturl.dto';
import { Shorturl } from './entities/shorturl.entity';
import base62 from 'base62';
import { ShortCode } from './entities/shortCode.entity';

@Injectable()
export class ShorturlService extends BaseService {
  constructor(
    @InjectRepository(Shorturl) private shorturlRepository: Repository<Shorturl>,
    @InjectRepository(ShortCode) private shortCodeRepository: Repository<ShortCode>,
  ) {
    super();
  }

  /**
   * 新增短链
   */
  async create(createShorturlDto: CreateShorturlDto) {
    const shorturl = this.shorturlRepository.create(createShorturlDto);
    await this.shorturlRepository.save(shorturl);
    return shorturl.id;
  }

  /**
   * 条件/分页查询
   */
  async findMany(findShorturldto: FindShorturlDto) {
    const { page, size } = findShorturldto;
    const { skip, take } = this.formatPagination(page, size, true);
    return this.shorturlRepository.findAndCount({ skip, take });
  }

  /**
   * 根据ID查询
   */
  findOne(idOrOptions: number | Partial<Shorturl>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    return this.shorturlRepository.findOne({ where });
  }

  /**
   * 根据ID更新
   */
  update(id: number, updateShorturlDto: UpdateShorturlDto) {
    return this.shorturlRepository.update(id, updateShorturlDto);
  }

  /**
   * 根据ID删除(软删除)
   */
  remove(id: number) {
    return this.shorturlRepository.softDelete(id);
  }

  getRandomBase62String(length = 6) {
    let string = '';
    for (let i = 0; i < length; i++) {
      const num = Math.floor(Math.random() * 62);
      string += base62.encode(num);
    }
    return string;
  }

  async insertRandomCode() {
    const code = this.getRandomBase62String();
    const query = await this.shortCodeRepository.findOne({ where: { code } });
    if (query) {
      return this.insertRandomCode();
    }
    return this.shortCodeRepository.insert({ code });
  }
}
