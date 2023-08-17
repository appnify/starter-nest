import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsOptional()
  @IsInt({ each: true })
  permissionIds?: number[];
}
