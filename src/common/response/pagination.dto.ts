import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

/**
 * 分页 DTO
 * @example { page: 1, size: 10 }
 */
export class PaginationDto {
  /**
   * 页码
   * @example 1
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page: number;

  /**
   * 每页条数
   * @example 10
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  size: number;
}
