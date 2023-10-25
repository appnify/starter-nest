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
