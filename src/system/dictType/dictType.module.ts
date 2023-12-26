import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictType } from './entities/dictType.entity';
import { DictTypeController } from './dictType.controller';
import { DictTypeService } from './dictType.service';

@Module({
  imports: [TypeOrmModule.forFeature([DictType])],
  controllers: [DictTypeController],
  providers: [DictTypeService],
  exports: [DictTypeService],
})
export class DictTypeModule {}
