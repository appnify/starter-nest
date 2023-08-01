import { IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@/features/pagination';

export class FindUserDto extends IntersectionType(PaginationDto) {
  @IsOptional()
  @IsString()
  nickname: string;
}
