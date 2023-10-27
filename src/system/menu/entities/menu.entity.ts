import { BaseEntity } from '@/database';
import { Role } from '@/system/role';
import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, Tree, TreeChildren, TreeParent } from 'typeorm';

@Tree('materialized-path')
@Entity({ orderBy: { id: 'DESC' } })
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

  /**
   * 父级菜单
   */
  @ApiHideProperty()
  @TreeParent()
  parent: Menu;

  /**
   * 父级ID
   */
  @Column({ comment: '父级ID', nullable: true })
  parentId: number;

  /**
   * 子项数组
   */
  @TreeChildren()
  children: Menu[];

  /**
   * 关联角色
   */
  @ApiHideProperty()
  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
