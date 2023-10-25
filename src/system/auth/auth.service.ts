import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user';
import { AuthUserDto } from './dto/auth-user.dto';
import { LoginedUserVo } from './vo/logined-user.vo';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(authUserDto: AuthUserDto) {
    const user = await this.userService.findOne({ username: authUserDto.username });
    if (!user) {
      console.log(user, authUserDto);
      throw new UnauthorizedException('用户名不存在');
    }
    if (user.password !== authUserDto.password) {
      throw new UnauthorizedException('密码错误');
    }
    const { password, ...rest } = user;
    const loginedUser = Object.assign(new LoginedUserVo(), rest);
    const { id, username, nickname } = loginedUser;
    loginedUser.token = await this.jwtService.signAsync({ id, username, nickname });
    return loginedUser;
  }
}
