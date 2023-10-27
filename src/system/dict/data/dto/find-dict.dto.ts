import { PaginationDto } from '@/middlewares/response';
import { IntersectionType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindDictDto extends IntersectionType(PaginationDto) {
  /**
   * 类型ID
   * @example 1
   */
  @IsInt()
  @Transform(({ value }) => Number(value))
  typeId: number;
}
