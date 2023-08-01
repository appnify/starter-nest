import { BaseEntity } from '@/features/typeorm';
import { Role } from '@/modules/role/entities/role.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
  /**
   * 权限名称
   * @example '文章列表'
   */
  @Column({ comment: '权限名称' })
  name: string;
  /**
   * 权限标识
   * @example 'post:list'
   */
  @Column({ comment: '权限标识' })
  slug: string;
  /**
   * 权限描述
   * @example '文章列表'
   */
  @Column({ comment: '权限描述', nullable: true })
  description: string;
  /**
   * 权限角色
   * @example '文章列表'
   */
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
