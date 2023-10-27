import { IsOptional, IsString } from 'class-validator';

export class CreateDictTypeDto {
  /**
   * 类型名称
   * @example '性别'
   */
  @IsString()
  name: string;

  /**
   * 标识
   * @example 'gender'
   */
  @IsString()
  code: string;

  /**
   * 描述
   * @examle '一段很长的描述'
   */
  @IsOptional()
  @IsString()
  description: string;
}
