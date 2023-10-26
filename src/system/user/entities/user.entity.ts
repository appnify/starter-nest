import { BaseEntity } from '@/database';
import { Post } from '@/content/post';
import { Role } from '@/system/role';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany, RelationId } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class User extends BaseEntity {
  /**
   * 登录账号
   * @example 'juetan'
   */
  @Column({ length: 48 })
  username: string;

  /**
   * 用户密码
   * @example 'password'
   */
  @Exclude()
  @Column({ length: 64 })
  password: string;

  /**
   * 加密盐
   * @example 'xx'
   */
  @Exclude()
  @ApiHideProperty()
  @Column({ comment: '加密盐', nullable: true })
  salt: string;

  /**
   * 用户昵称
   * @example '绝弹'
   */
  @Column({ length: 48 })
  nickname: string;

  /**
   * 用户介绍
   * @example '这个人很懒, 什么也没有留下!'
   */
  @Column({ default: '这个人很懒, 什么也没有留下!' })
  description: string;

  /**
   * 用户头像
   * @example '/upload/assets/222421415123.png '
   */
  @Column({ nullable: true })
  avatar: string;

  /**
   * 用户邮箱
   * @example 'example@mail.com'
   */
  @Column({ length: 64, nullable: true })
  email: string;

  /**
   * 用户文章
   */
  @ApiHideProperty()
  @ManyToMany(() => Post, (post) => post.author)
  @JoinTable()
  posts: Post[];

  /**
   * 用户角色
   */
  @ApiHideProperty()
  @ManyToMany(() => Role, (role) => role.user, { cascade: true })
  @JoinTable()
  roles: Role[];

  /**
   * 用户角色ID
   */
  @RelationId('roles')
  roleIds: number[];
}
