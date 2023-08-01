import { BaseEntity } from '@/features/typeorm';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { User } from 'src/modules/user';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

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
  /**
   * 角色权限
   * @example [1, 2, 3]
   */
  @JoinTable()
  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
  /**
   * 角色用户
   * @example [1, 2, 3]
   */
  @ManyToMany(() => User, (user) => user.roles)
  user: User;
}
