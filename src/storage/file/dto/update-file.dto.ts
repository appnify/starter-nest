import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateFileDto {
  /**
   * 文件名
   * @example "头像.jpg"
   */
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * 描述
   * @example '一段很长的描述'
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * 分类ID
   * @example 1
   */
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
