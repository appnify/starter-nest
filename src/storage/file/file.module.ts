import { ConfigService } from '@/config';
import { dayjs } from '@/libraries';
import { Module, forwardRef } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FileCategoryModule } from '../fileCategory';
import { File } from './entities/file.entity';
import { FileController } from './file.controller';
import { FileService } from './file.service';

const MulteredModule = MulterModule.registerAsync({
  useFactory: (config: ConfigService) => ({
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
    fileFilter(req, file, callback) {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8');
      callback(null, true);
    },
  }),
  inject: [ConfigService],
});

@Module({
  imports: [TypeOrmModule.forFeature([File]), MulteredModule, forwardRef(() => FileCategoryModule)],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
