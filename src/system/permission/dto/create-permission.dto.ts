import { IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  /**
   * 权限名称
   * @example 权限名称
   */
  @IsString()
  name: string;
  /**
   * 权限标识
   * @example permission:permission
   */
  @IsString()
  slug: string;
  /**
   * 权限描述
   */
  @IsOptional()
  @IsString()
  description?: string;
}
