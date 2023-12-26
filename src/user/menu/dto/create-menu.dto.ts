import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  /**
   * 父级ID
   * @example 0
   */
  @IsOptional()
  @IsInt()
  parentId: number;

  /**
   * 菜单名称
   * @example '首页'
   */
  @IsString()
  name: string;

  /**
   * 标识
   * @example 'home'
   */
  @IsString()
  code: string;

  /**
   * 访问路径
   * @example '/home'
   */
  @IsOptional()
  @IsString()
  path: string;

  /**
   * 图标类名
   * @example 'icon-park-outline-home'
   */
  @IsOptional()
  @IsString()
  icon: string;

  /**
   * 类型
   * @example 1
   * @description 1目录 2页面 3按钮
   */
  @IsInt()
  type: number;
}
