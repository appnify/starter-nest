import { BaseEntity } from '@/database';
import { User } from '@/user/user';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class Post extends BaseEntity {
  /**
   * 文章标题
   * @example '文章标题'
   */
  @Column()
  title: string;
  /**
   * 文章描述
   * @example '文章描述'
   */
  @Column()
  description: string;
  /**
   * 文章内容
   * @example '文章内容'
   */
  @Column()
  content: string;
  /**
   * 文章作者
   * @example '文章作者'
   */
  @ManyToMany(() => User, (user) => user.posts)
  author: User;
}
