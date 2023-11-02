import { PartialType } from '@nestjs/swagger';
import { CreateFileCategoryDto } from './create-fileCategory.dto';

export class UpdateFileCategoryDto extends PartialType(CreateFileCategoryDto) {}
