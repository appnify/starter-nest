import { BaseEntity } from '@/database';
import { Column, Entity } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class Upload extends BaseEntity {
  /**
   * 文件名
   * @example "xxx.jpg"
   */
  @Column({ comment: '文件名' })
  name: string;

  /**
   * 文件大小
   * @example 1024
   */
  @Column({ comment: '文件大小' })
  size: number;

  /**
   * 文件类型
   * @example "image/jpeg"
   */
  @Column({ comment: '文件类型' })
  mimetype: string;

  /**
   * 文件路径
   * @example "/upload/2021/10/01/xxx.jpg"
   */
  @Column({ comment: '文件路径' })
  path: string;

  /**
   * 文件哈希
   * @example "2afb1f8b83ef0cc564f227d75d0b6914"
   */
  @Column({ comment: '文件哈希' })
  hash: string;

  /**
   * 文件后缀
   * @example ".jpg"
   */
  @Column({ comment: '文件后缀' })
  extension: string;
}