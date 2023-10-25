import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * 基础实体
 * @description 所有实体都应该继承该类
 */
@Entity()
export class BaseEntity {
  /**
   * 自增ID
   * @example 1
   */
  @PrimaryGeneratedColumn({ comment: '自增ID' })
  id: number;

  /**
   * 创建时间
   * @example "2022-01-01 10:10:10"
   */
  @CreateDateColumn({ comment: '创建时间' })
  createdAt: Date;

  /**
   * 创建人
   * @example '绝弹'
   */
  @Column({ comment: '创建人', nullable: true })
  createdBy: string;

  /**
   * 更新时间
   * @example "2022-01-02 11:11:11"
   */
  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: Date;

  /**
   * 更新人
   * @example '绝弹'
   */
  @Column({ comment: '更新人', nullable: true })
  updatedBy: string;

  /**
   * 删除时间
   * @example "2022-01-03 12:12:12"
   */
  @Exclude()
  @ApiHideProperty()
  @DeleteDateColumn({ comment: '删除时间', select: false })
  deleteddAt: Date;

  /**
   * 删除人
   * @example '绝弹'
   */
  @Exclude()
  @ApiHideProperty()
  @Column({ comment: '删除人', nullable: true, select: false })
  deletedBy: string;
}
