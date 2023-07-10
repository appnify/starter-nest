import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config';
export * from './config';
export * from './entities/base';

/**
 * 连接数据库
 */
export const TypeormModule = TypeOrmModule.forRoot(ormConfig);
