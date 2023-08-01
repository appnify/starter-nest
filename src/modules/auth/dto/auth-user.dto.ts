import { IsString } from 'class-validator';

export class AuthUserDto {
  /**
   * 用户名
   * @example admin
   */
  @IsString()
  username: string;
  /**
   * 用户密码
   * @example 123456
   */
  @IsString()
  password: string;
}
