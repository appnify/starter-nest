import { PaginationDto } from '@/middlewares/response';
import { IntersectionType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class FindFileCategoryDto extends IntersectionType(PaginationDto) {
  /**
   * 分类名称
   * @example '风景'
   */
  @IsOptional()
  @IsString()
  name?: string;
}
