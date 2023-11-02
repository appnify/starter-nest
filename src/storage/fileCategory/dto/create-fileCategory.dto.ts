import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFileCategoryDto {
  /**
   * 分类名称
   * @example '风景'
   */
  @IsString()
  name: string;

  /**
   * 分类编码
   * @example 'view'
   */
  @IsString()
  code: string;

  /**
   * 分类描述
   * @example '这是一段很长的描述'
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * 父级ID
   * @example 0
   */
  @IsOptional()
  @IsInt()
  parentId?: number;
}
