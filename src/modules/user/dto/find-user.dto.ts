import { IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@/common/response';

export class FindUserDto extends IntersectionType(PaginationDto) {
  /**
   * 用户昵称
   * @example '绝弹'
   */
  @IsOptional()
  @IsString()
  nickname?: string;
}
