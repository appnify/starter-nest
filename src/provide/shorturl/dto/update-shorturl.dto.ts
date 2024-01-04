import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateShorturlDto } from './create-shorturl.dto';

export class UpdateShorturlDto extends PartialType(CreateShorturlDto) {
  @IsNumber()
  id: number;
}
