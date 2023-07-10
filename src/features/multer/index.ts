import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule as _MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, parse } from 'path';
import { dayjs } from 'src/common';

@Global()
@Module({
  imports: [
    _MulterModule.registerAsync({
      useFactory: async (configService) => {
        const dest = configService.get('UPLOAD_FOLDER', './content/upload');
        return {
          storage: diskStorage({
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
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [_MulterModule],
})
export class MulterModule {}
