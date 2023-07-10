import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class LocalAuthService extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('密码错误');
    }
    return true;
  }
}
