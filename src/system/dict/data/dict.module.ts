import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dict } from './entities/dict.entity';
import { DictController } from './dict.controller';
import { DictService } from './dict.service';
import { DictTypeModule } from '../dictType';

@Module({
  imports: [TypeOrmModule.forFeature([Dict]), forwardRef(() => DictTypeModule)],
  controllers: [DictController],
  providers: [DictService],
  exports: [DictService],
})
export class DictModule {}
