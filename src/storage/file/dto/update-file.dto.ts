import { PartialType } from '@nestjs/swagger';
import { CreateUploadDto } from './create-file.dto';

export class UpdateUploadDto extends PartialType(CreateUploadDto) {}
