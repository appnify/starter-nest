import { PaginationDto } from '@/middlewares/response';
import { IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindDictTypeDto extends IntersectionType(PaginationDto) {
  /**
   * 字段描述(Swagger用途)
   * @example '示例值'
   */
  @IsOptional()
  @IsString()
  demo?: string;
}
