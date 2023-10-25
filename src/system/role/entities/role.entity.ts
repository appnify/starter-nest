import { BaseEntity } from '@/database';
import { Menu } from '@/system/menu';
import { Permission } from '@/system/permission/entities/permission.entity';
import { User } from '@/system/user';
import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany, RelationId } from 'typeorm';

@Entity()
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
  slug: string;

  /**
   * 角色描述
   * @example '拥有所有权限'
   */
  @Column({ comment: '角色描述', nullable: true })
  description: string;

  @ApiHideProperty()
  @ManyToMany(() => User, (user) => user.roles)
  user: User;

  @ApiHideProperty()
  @JoinTable()
  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];

  @ApiHideProperty()
  @RelationId('permissions')
  permissionIds: number[];

  @ApiHideProperty()
  @ManyToMany(() => Menu, (menu) => menu.roles)
  menus: Menu[];
}
