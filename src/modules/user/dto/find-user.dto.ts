import { IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@/common/response';

export class FindUserDto extends IntersectionType(PaginationDto) {
  @IsOptional()
  @IsString()
  nickname: string;
}
