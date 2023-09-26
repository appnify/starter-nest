import { ConfigService } from '@/config';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { Upload } from './entities/upload.entity';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload]),
    MulterModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          storage: diskStorage({
            destination: (req, file, next) => {
              const date = new Date();
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const dest = join(config.uploadDir, year.toString(), month.toString().padStart(2, '0'));
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
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
