import { PaginationDto } from '@/features/pagination';
import { IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindUserDto extends IntersectionType(PaginationDto) {
  @IsOptional()
  @IsString()
  nickname?: string;
}
