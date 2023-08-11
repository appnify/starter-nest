import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Matches, Min } from 'class-validator';

/**
 * 分页 DTO
 * @example
 * ```
 * {
 *    page: 1,
 *    size: 10
 * }
 * ```
 */
export class PaginationDto {
  /**
   * 排序规则
   * @example 'id:desc'
   */
  @IsOptional()
  @Matches(/^(\w+:\w+,)*\w+:\w+$/)
  sort?: string = 'id:desc';

  /**
   * 页码
   * @example 1
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page?: number;

  /**
   * 每页条数
   * @example 10
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => Number(value))
  size?: number;
}
