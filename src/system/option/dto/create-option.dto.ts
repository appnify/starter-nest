import { IsOptional, IsString } from 'class-validator';

export class CreateOptionDto {
  /**
   * 选项名
   * @example 'title'
   */
  @IsString()
  name: string;
  /**
   * 选项值
   * @example '绝弹管理平台'
   */
  @IsOptional({})
  value: string;
}
