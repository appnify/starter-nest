import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateLogDto } from './dto/create-log.dto';
import { FindLogDto } from './dto/find-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { AuthLog } from './entities/authLog.entity';

@Injectable()
export class LogService extends BaseService {
  constructor(@InjectRepository(AuthLog) private logRepository: Repository<AuthLog>) {
    super();
  }

  /**
   * 新增日志管理
   */
  async create(createLogDto: CreateLogDto) {
    const log = this.logRepository.create();
    await this.logRepository.save(log);
    return log.id;
  }

  /**
   * 条件/分页查询
   */
  async findMany(findLogdto: FindLogDto) {
    const { page, size } = findLogdto;
    const { skip, take } = this.formatPagination(page, size, true);
    return this.logRepository.findAndCount({ skip, take });
  }

  /**
   * 根据ID查询
   */
  findOne(idOrOptions: number | Partial<AuthLog>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    return this.logRepository.findOne({ where });
  }

  /**
   * 根据ID更新
   */
  update(id: number, updateLogDto: UpdateLogDto) {
    // return this.logRepository.update();
  }

  /**
   * 根据ID删除(软删除)
   */
  remove(id: number) {
    return this.logRepository.softDelete(id);
  }
}
