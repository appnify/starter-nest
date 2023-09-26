import { PaginationDto } from '@/common/response';
import { IntersectionType } from '@nestjs/swagger';

export class FindPostDto extends IntersectionType(PaginationDto) {}
