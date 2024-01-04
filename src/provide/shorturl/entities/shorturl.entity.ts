import { BaseEntity } from '@/database';
import { Column, Entity } from 'typeorm';

@Entity({ orderBy: { id: 'DESC' } })
export class Shorturl extends BaseEntity {
  /**
   * 字段描述(Swagger用途)
   * @example '示例值'
   */
  @Column()
  demo: string;
}
