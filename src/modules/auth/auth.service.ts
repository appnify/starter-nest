import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  // 验证用户
  async auth(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ username });
    if (!user) return null;
    if (user.password !== password) return null;
    return user;
  }

  // 令牌签名
  async sign(user: any) {
    const payload = { id: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
