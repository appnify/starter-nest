import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  /**
   * 登录账号
   * @example 'juetan'
   */
  @IsString()
  username: string;

  /**
   * 用户密码
   * @example 'password'
   */
  @IsOptional()
  @IsString()
  password?: string;

  /**
   * 用户昵称
   * @example '绝弹'
   */
  @IsString()
  nickname: string;

  /**
   * 用户描述
   * @example '这个人很懒，什么也没有留下!'
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * 用户头像
   * @example 1
   */
  @IsOptional()
  @IsString()
  avatar?: string;

  /**
   * 角色ID列表
   * @example [1]
   */
  @IsOptional()
  @IsInt({ each: true })
  roleIds?: number[];
}
