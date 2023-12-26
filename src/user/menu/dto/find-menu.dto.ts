import { PaginationDto } from '@/middlewares/response';
import { IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FindMenuDto extends IntersectionType(PaginationDto) {
  /**
   * 是否以树结构返回
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  tree?: boolean;
}
