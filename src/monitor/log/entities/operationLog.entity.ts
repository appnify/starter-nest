import { BaseEntity } from '@/database';
import { Column, Entity } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class OperationLog extends BaseEntity {
  /**
   * 用户昵称
   * @example '绝弹'
   */
  @Column()
  nickname: string;

  /**
   * 操作描述
   * @example 1
   */
  @Column()
  description: string;

  /**
   * 登陆IP
   * @example '127.0.0.1'
   */
  @Column()
  ip: string;

  /**
   * 登陆地址
   * @example '广东省深圳市'
   */
  @Column()
  addr: string;

  /**
   * 浏览器
   * @example 'chrome'
   */
  @Column()
  browser: string;

  /**
   * 操作系统
   * @example 'windows 10'
   */
  @Column()
  os: string;
}
