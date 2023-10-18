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
   * 请求方法
   */
  @Column()
  method: string;

  /**
   * 请求路径
   */
  @Column()
  path: string;

  /**
   * 操作描述
   * @example 1
   */
  @Column()
  description: string;
}
