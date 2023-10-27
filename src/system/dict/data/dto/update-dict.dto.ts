import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateDictDto } from './create-dict.dto';

export class UpdateDictDto extends PartialType(CreateDictDto) {
  @IsNumber()
  id: number;
}
