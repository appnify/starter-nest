import { PaginationDto } from '@/middlewares/response';
import { IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindFileDto extends IntersectionType(PaginationDto) {
  /**
   * 文件名称
   * @example '风景'
   */
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * 分类ID
   * @example 1
   */
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  categoryId?: number;
}
