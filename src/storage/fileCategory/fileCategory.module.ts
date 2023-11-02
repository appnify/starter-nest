import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileCategory } from './entities/fileCategory.entity';
import { FileCategoryController } from './fileCategory.controller';
import { FileCategoryService } from './fileCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileCategory])],
  controllers: [FileCategoryController],
  providers: [FileCategoryService],
  exports: [FileCategoryService],
})
export class FileCategoryModule {}
