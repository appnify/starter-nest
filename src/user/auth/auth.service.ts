import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user';
import { AuthUserDto } from './dto/auth-user.dto';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(authUserDto: AuthUserDto) {
    const user = await this.userService.findOne({ username: authUserDto.username });
    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    }
    const { password, salt, id, username, nickname } = user;
    const md5 = createHash('md5');
    const salted = md5.update(authUserDto.password + salt).digest('hex');
    if (salted !== password) {
      throw new UnauthorizedException('用户密码错误');
    }
    return this.jwtService.signAsync({ id, username, nickname });
  }

  async getUserInfo(id: number) {
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new NotFoundException('用户未找到');
    }
    return user;
  }
}
