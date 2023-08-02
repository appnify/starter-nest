import { PaginationDto } from '@/features/pagination';
import { IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
<<<<<<< HEAD
=======
import { PaginationDto } from '@/common/response';
>>>>>>> 1a32173fc73bbb94906f9ffde5874d47f6dfdad8

export class FindUserDto extends IntersectionType(PaginationDto) {
  /**
   * 用户昵称
   * @example '绝弹'
   */
  @IsOptional()
  @IsString()
  nickname?: string;
}
