import { Module } from '@nestjs/common';
import { CategoryModule } from './category';

@Module({
  imports: [
    /**
     * 分类模块
     */
    CategoryModule
  ],
})
export class ContentModule {}
