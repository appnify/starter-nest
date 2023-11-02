import { BaseEntity } from '@/database';
import { File } from '@/storage/file';
import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';

@Tree('materialized-path')
@Entity({ orderBy: { id: 'DESC' } })
export class FileCategory extends BaseEntity {
  /**
   * 分类名称
   * @example '风景'
   */
  @Column({ comment: '分类描述' })
  name: string;

  /**
   * 分类编码
   * @example 'view'
   */
  @Column({ comment: '分类编码' })
  code: string;

  /**
   * 分类描述
   * @example '这是一段很长的描述'
   */
  @Column({ comment: '分类描述', nullable: true })
  description?: string;

  /**
   * 文件列表
   */
  @ApiHideProperty()
  @OneToMany(() => File, file => file.category)
  files: File[];

  /**
   * 父级分类
   */
  @ApiHideProperty()
  @TreeParent()
  parent?: FileCategory;

  /**
   * 父级ID
   */
  @Column({ comment: '父级ID', nullable: true })
  parentId?: number;

  /**
   * 子项数组
   */
  @ApiHideProperty()
  @TreeChildren()
  childrent: FileCategory[];
}
