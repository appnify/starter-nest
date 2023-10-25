import { BaseEntity } from '@/database';
import { Role } from '@/system/role';
import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToMany, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
@Tree('materialized-path')
export class Menu extends BaseEntity {
  /**
   * 菜单名称
   * @example '首页'
   */
  @Column({ comment: '菜单名称' })
  name: string;

  /**
   * 标识
   * @example 'home'
   */
  @Column({ comment: '标识' })
  code: string;

  /**
   * 访问路径
   * @example '/home'
   */
  @Column({ comment: '访问路径', nullable: true })
  path: string;

  /**
   * 图标类名
   * @example 'icon-park-outline-home'
   */
  @Column({ comment: '图标类名', nullable: true })
  icon: string;

  /**
   * 类型
   * @example 1
   * @description 1目录 2页面 3按钮
   */
  @Column({ comment: '类型(1: 目录, 2: 页面, 3: 按钮)' })
  type: number;

  @ApiHideProperty()
  @TreeParent()
  parent: Menu;

  @Column({ comment: '父级ID', nullable: true, default: 0 })
  parentId: number;

  @ApiHideProperty()
  @TreeChildren()
  children: Menu[];

  @ApiHideProperty()
  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
