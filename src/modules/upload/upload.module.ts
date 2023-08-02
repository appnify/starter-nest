import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@/config';
import dayjs from 'dayjs';
import { join, parse } from 'path';
import { diskStorage } from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Upload]),
    MulterModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        const dest = config.uploadDir;
        const storage = diskStorage({
          destination: join(dest),
          filename: (req, file, cb) => {
            const yearMonth = dayjs().format('YYYY-MM');
            const { name, ext } = parse(file.originalname);
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            cb(null, `${yearMonth}/${name}-${randomName}${ext}`);
          },
        });
        return { storage };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
