import { BaseEntity } from '@/database';
import { Column, Entity, OneToMany } from 'typeorm';
import { Dict } from '@/system/dict';

@Entity({ orderBy: { id: 'DESC' } })
export class DictType extends BaseEntity {
  /**
   * 类型名称
   * @example '性别'
   */
  @Column({ comment: '名称' })
  name: string;

  /**
   * 标识
   * @example 'gender'
   */
  @Column({ comment: '标识' })
  code: string;

  /**
   * 状态
   * @example true
   */
  @Column({ comment: '状态', default: true })
  status: boolean;

  /**
   * 描述
   * @examle '一段很长的描述'
   */
  @Column({ comment: '描述' })
  description: string;

  /**
   * 字典数组
   */
  @OneToMany(() => Dict, (dict) => dict.type)
  dicts: Dict[];
}
