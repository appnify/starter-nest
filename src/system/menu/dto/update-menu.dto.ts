import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateMenuDto } from './create-menu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {}
