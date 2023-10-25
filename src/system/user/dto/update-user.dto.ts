import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * 用户ID
   * @example 1
   */
  @IsNumber()
  id: number;
}
