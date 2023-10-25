import { PaginationDto } from '@/middlewares/response';
import { IntersectionType } from '@nestjs/swagger';

export class FindPostDto extends IntersectionType(PaginationDto) {}
