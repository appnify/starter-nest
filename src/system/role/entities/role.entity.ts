import { BaseEntity } from '@/database';
import { Menu } from '@/system/menu';
import { User } from '@/system/user';
import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, RelationId } from 'typeorm';

@Entity({ name: 'system_role' })
export class Role extends BaseEntity {
  /**
   * 角色名称
   * @example '管理员'
   */
  @Column({ comment: '角色名称' })
  name: string;

  /**
   * 角色标识
   * @example 'admin'
   */
  @Column({ comment: '角色标识' })
  code: string;

  /**
   * 角色描述
   * @example '拥有所有权限'
   */
  @Column({ comment: '角色描述', nullable: true })
  description: string;

  /**
   * 关联用户
   */
  @ApiHideProperty()
  @ManyToMany(() => User, (user) => user.roles)
  user: User;

  /**
   * 关联菜单
   */
  @ApiHideProperty()
  @ManyToMany(() => Menu, (menu) => menu.roles)
  menus: Menu[];
}
