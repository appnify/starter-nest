import { Permission } from '@/modules/permission/entities/permission.entity';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsInt({ each: true })
  permissions?: Permission[];
}
