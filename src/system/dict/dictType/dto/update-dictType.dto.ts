import { PartialType } from '@nestjs/swagger';
import { CreateDictTypeDto } from './create-dictType.dto';

export class UpdateDictTypeDto extends PartialType(CreateDictTypeDto) {}
