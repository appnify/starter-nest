import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  /**
   * 登录账号
   * @example 'juetan'
   */
  @IsString()
  username: string;
  /**
   * 用户昵称
   * @example '绝弹'
   */
  @IsString()
  nickname: string;
  /**
   * 用户密码
   * @example 'password'
   */
  @IsOptional()
  @IsString()
  password?: string;
  /**
   * 头像ID
   * @example 1
   */
  @IsOptional()
  @IsString()
  avatarId?: number;
  /**
   * 角色ID列表
   * @example [1, 2, 3]
   */
  @IsOptional()
  @IsInt({ each: true })
  roleIds?: number[];
}
