import { PaginationDto } from '@/middlewares/response';
import { IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FindLogDto extends IntersectionType(PaginationDto) {
  /**
   * 用户名
   * @example '绝弹'
   */
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value && value.trim())
  nickname?: string;
}
