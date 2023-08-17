import { IsString } from 'class-validator';

export class CreateLogDto {
  /**
   * 字段描述(Swagger用途)
   * @example 'demo'
   */
  @IsString()
  demo: string;
}
