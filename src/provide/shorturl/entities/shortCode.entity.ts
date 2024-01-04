import { BaseEntity } from '@/database';
import { Column, Entity } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class ShortCode extends BaseEntity {
  /**
   * 字段描述(Swagger用途)
   * @example '示例值'
   */
  @Column()
  code: string;

  /**
   * 使用状态
   * @example true
   */
  @Column({ comment: '使用状态', default: false })
  status: boolean;
}
