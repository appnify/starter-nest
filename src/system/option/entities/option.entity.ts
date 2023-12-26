import { BaseEntity } from '@/database';
import { Column, Entity } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class Option extends BaseEntity {
  /**
   * 选项名
   * @example 'title'
   */
  @Column({ unique: true, })
  name: string;
  /**
   * 选项值
   * @example '绝弹管理平台'
   */
  @Column({ nullable: true, })
  value: string;
}
