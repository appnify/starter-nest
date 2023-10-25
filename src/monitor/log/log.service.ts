import { BaseService } from '@/common/base';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Like, Repository } from 'typeorm';
import uaParser from 'ua-parser-js';
import { CreateLogDto } from './dto/create-log.dto';
import { FindLogDto } from './dto/find-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LoginLog } from './entities/loginLog.entity';

@Injectable()
export class LogService extends BaseService {
  constructor(@InjectRepository(LoginLog) private loginLogRepository: Repository<LoginLog>) {
    super();
  }

  /**
   * 新增日志管理
   */
  async create(createLogDto: CreateLogDto) {
    const log = this.loginLogRepository.create();
    await this.loginLogRepository.save(log);
    return log.id;
  }

  /**
   * 添加登陆日志
   */
  async addLoginLog(log: { nickname: string; status: boolean; description: string; ip: string; userAgent: string }) {
    const { nickname, status, description, ip, userAgent } = log;
    const { browser, os } = this.parseUserAgent(userAgent);
    const { addr } = await this.parseUserIp(ip);
    const loginLog = this.loginLogRepository.create({
      nickname,
      status,
      description,
      ip,
      addr,
      browser,
      os,
    });
    await this.loginLogRepository.save(loginLog);
    return loginLog.id;
  }

  /**
   * 解析浏览器信息
   */
  parseUserAgent(userAgent: string) {
    const ua = uaParser(userAgent);
    const { browser, os } = ua;
    return {
      browser: `${browser.name} ${browser.version}`,
      os: `${os.name} ${os.version}`,
    };
  }

  /**
   * 解析IP地址
   */
  async parseUserIp(ip: string) {
    const result = {
      addr: '',
    };
    try {
      const url = 'https://whois.pconline.com.cn/ipJson.jsp';
      const params = { ip, json: true };
      const { data } = await axios.get(url, { params, responseType: 'arraybuffer' });
      const dataStr = new TextDecoder('gbk').decode(data);
      const parased = JSON.parse(dataStr);
      result.addr = parased.addr;
    } catch {
      result.addr = '未知';
    }
    return result;
  }

  /**
   * 条件/分页查询
   */
  async findMany(findLogdto: FindLogDto) {
    const { page, size, nickname: nick } = findLogdto;
    const { skip, take } = this.formatPagination(page, size, true);
    const nickname = nick ? Like(`%${nick}%`) : undefined;
    return this.loginLogRepository.findAndCount({
      skip,
      take,
      where: {
        nickname,
      },
    });
  }

  /**
   * 根据ID查询
   */
  findOne(idOrOptions: number | Partial<LoginLog>) {
    const where = typeof idOrOptions === 'number' ? { id: idOrOptions } : (idOrOptions as any);
    return this.loginLogRepository.findOne({ where });
  }

  /**
   * 根据ID更新
   */
  update(id: number, updateLogDto: UpdateLogDto) {
    // return this.loginLogRepository.update();
  }

  /**
   * 根据ID删除(软删除)
   */
  remove(id: number) {
    return this.loginLogRepository.softDelete(id);
  }
}
