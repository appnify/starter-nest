import { User } from '@/system/user';
import { OmitType } from '@nestjs/swagger';

export class LoginedUserVo extends OmitType(User, ['password', 'id'] as const) {
  /**
   * 用户ID
   */
  id: number;
  /**
   * 访问令牌
   * @example 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoianVldGFuIiwiaWF0IjoxNjkxMTM5MjI3LCJleHAiOjE2OTExOTkyMjd9.6z7f-xfsHABbsyg401o2boKeqNQ1epPDYfEdavIcfYc'
   */
  token: string;
}
