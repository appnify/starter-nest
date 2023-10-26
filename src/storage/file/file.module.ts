import { ConfigService } from '@/config';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Upload } from './entities/file.entity';
import { UploadController } from './file.controller';
import { UploadService } from './file.service';
import { dayjs } from '@/libraries';

const MulteredModule = MulterModule.registerAsync({
  useFactory: (config: ConfigService) => {
    return {
      storage: diskStorage({
        destination: (req, file, next) => {
          const dest = join(config.uploadDir, dayjs().format(dayjs.DATE));
          if (!existsSync(dest)) {
            mkdirSync(dest, { recursive: true });
          }
          next(null, dest);
        },
        filename: (req, file, next) => {
          next(null, Date.now() + extname(file.originalname));
        },
      }),
    };
  },
  inject: [ConfigService],
});

@Module({
  imports: [TypeOrmModule.forFeature([Upload]), MulteredModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
