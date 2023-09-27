import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  /**
   * 分类名称
   * @example '待分类'
   */
  @IsString()
  title: string;
  /**
   * 分类别名
   * @example 'default'
   */
  @IsString()
  slug: string;
  /**
   * 分类描述
   * @example '默认分类'
   */
  @IsString()
  @IsOptional()
  description?: string;
  /**
   * 分类图标
   * @example 'default'
   */
  @IsString()
  @IsOptional()
  icon?: string;
  /**
   * 分类排序
   * @example 0
   */
  @IsNumber()
  @IsOptional()
  sort?: number;
  /**
   * 分类类型
   * @example 'category'
   */
  @IsEnum(['category', 'tag'])
  @IsOptional()
  type: 'category' | 'tag';
  /**
   * 父级分类ID
   * @example 0
   */
  @IsNumber()
  @IsOptional()
  parentId?: number;
}
