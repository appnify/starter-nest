import { BaseEntity } from '@/database';
import { FileCategory } from '@/storage/fileCategory';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class File extends BaseEntity {
  /**
   * 文件名
   * @example "头像.jpg"
   */
  @Column({ comment: '文件名' })
  name: string;

  /**
   * 描述
   * @example '一段很长的描述'
   */
  @Column({ comment: '描述' })
  description: string;

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
   * @example "/upload/2021-10-01/xxx.jpg"
   */
  @Column({ comment: '文件路径' })
  @Transform(({ value }) => (process.env.SERVER_URL ?? '') + value)
  path: string;

  /**
   * MD5哈希
   * @example "2afb1f8b83ef0cc564f227d75d0b6914"
   */
  @Column({ comment: 'MD5哈希' })
  hash: string;

  /**
   * 文件后缀
   * @example ".jpg"
   */
  @Column({ comment: '文件后缀' })
  extension: string;

  /**
   * 文件类型
   * @example 1
   */
  @Column({ comment: '类型(1: 文本，2: 图片，3: 音频，4: 视频，5: 其他)', nullable: true })
  type: number;

  /**
   * 分类
   */
  @ApiHideProperty()
  @ManyToOne(() => FileCategory, (category) => category.files)
  @JoinColumn()
  category: FileCategory;

  /**
   * 分类ID
   * @example 0
   */
  @Exclude()
  @ApiHideProperty()
  @Column({ comment: '分类ID', nullable: true })
  categoryId: number;
}
