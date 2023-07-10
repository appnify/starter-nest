import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: '用户名不能为空' })
  username: string;

  @IsString()
  password: string;

  @IsString()
  nickname: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
