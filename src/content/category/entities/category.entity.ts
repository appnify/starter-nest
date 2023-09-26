import { BaseEntity } from '@/database';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class Category extends BaseEntity {
  /**
   * 分类名称
   * @example '待分类'
   */
  @Column()
  title: string;
  /**
   * 分类别名
   * @example 'default'
   */
  @Column()
  slug: string;
  /**
   * 分类描述
   * @example '默认分类'
   */
  @Column({ nullable: true })
  description?: string;
  /**
   * 分类图标
   * @example 'default'
   */
  @Column({ nullable: true })
  icon?: string;
  /**
   * 分类排序
   * @example 0
   */
  @Column({ default: 0 })
  sort?: number;
  /**
   * 分类类型
   * @example 'category'
   */
  @Column({ default: 'category' })
  type?: 'category' | 'tag';
  /**
   * 父级分类ID
   * @example 0
   */
  @Column({ default: 0, nullable: true })
  parentId?: number;
}
