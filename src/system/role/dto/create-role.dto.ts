import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  /**
   * 角色名称
   * @example '管理员'
   */
  @IsString()
  name: string;

  /**
   * 角色标识
   * @example 'admin'
   */
  @IsString()
  slug: string;

  /**
   * 角色描述
   * @example '一段很长的描述'
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * 角色ID数组
   * @example [1]
   */
  @IsOptional()
  @IsInt({ each: true })
  menuIds: number[];
}
