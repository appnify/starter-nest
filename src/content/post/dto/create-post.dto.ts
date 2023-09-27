import { IsString } from 'class-validator';

export class CreatePostDto {
  /**
   * 文章标题
   */
  @IsString()
  title: string;
  /**
   * 文章描述
   */
  @IsString()
  description: string;
  /**
   * 文章内容
   */
  @IsString()
  content: string;
}
