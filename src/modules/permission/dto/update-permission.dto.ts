import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsNumber()
  id: number;
}
