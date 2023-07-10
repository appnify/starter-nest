import { IntersectionType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { paginationDto } from 'src/features';

export class FindUserDto extends IntersectionType(paginationDto) {
  @IsString()
  name: string;
}
