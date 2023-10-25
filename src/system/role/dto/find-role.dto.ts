import { PaginationDto } from '@/common/response';
import { IsBoolean, IsOptional } from 'class-validator';

export class FindMenuDto extends PaginationDto {
  /**
   * 是否以树结构返回
   * @example false
   */
  @IsOptional()
  @IsBoolean()
  tree?: boolean;
}
