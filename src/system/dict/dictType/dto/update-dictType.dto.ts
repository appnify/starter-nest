import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateDictTypeDto } from './create-dictType.dto';

export class UpdateDictTypeDto extends PartialType(CreateDictTypeDto) {
  @IsNumber()
  id: number;
}
