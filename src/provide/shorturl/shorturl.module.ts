import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shorturl } from './entities/shorturl.entity';
import { ShorturlController } from './shorturl.controller';
import { ShorturlService } from './shorturl.service';
import { ShortCode } from './entities/shortCode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shorturl, ShortCode])],
  controllers: [ShorturlController],
  providers: [ShorturlService],
  exports: [ShorturlService],
})
export class ShorturlModule {}
