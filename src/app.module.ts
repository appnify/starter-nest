import { ServeStaticModule } from '@/common/static';
import { ConfigModule } from '@/config';
import { ContentModule } from '@/content/content.module';
import { PostModule } from '@/content/post';
import { DatabaseModule } from '@/database';
import { ResponseModule } from '@/middlewares/response';
import { SerializationModule } from '@/middlewares/serialization';
import { ValidationModule } from '@/middlewares/validation';
import { LoggerModule } from '@/monitor/logger';
import { CacheModule } from '@/storage/cache';
import { UploadModule } from '@/storage/file';
import { AuthModule } from '@/system/auth';
import { PermissionModule } from '@/system/permission';
import { RoleModule } from '@/system/role';
import { UserModule } from '@/system/user';
import { ScanModule } from '@/utils/scan.module';
import { Module } from '@nestjs/common';
import { MenuModule } from './system/menu';

@Module({
  imports: [
    /**
     * 扫描模块
     */
    ScanModule.forRoot(),
    /**
     * 配置模块(全局)
     * @description 加载.env配置文件
     */
    ConfigModule,
    /**
     * 日志模块(全局)
     * @description 用于记录日志
     */
    LoggerModule,
    /**
     * 缓存模块
     * @description 用于缓存数据
     */
    CacheModule,
    /**
     * 静态资源(全局)
     * @description 为静态页面/上传文件提供服务
     */
    ServeStaticModule,
    /**
     * 序列化模块
     * @description 序列化响应结果/异常结果，移除/替换字段
     */
    SerializationModule,
    /**
     * 响应模块
     * @description 包装响应结果/异常结果
     */
    ResponseModule,
    /**
     * 校验模块
     * @description 校验请求参数，抛出异常时按响应模块的格式包装
     */
    ValidationModule,
    /**
     * 数据库ORM
     * @description 用于连接数据库
     */
    DatabaseModule,

    /**
     * 用户模块
     */
    UserModule,
    /**
     * 登陆模块
     */
    AuthModule,
    /**
     * 角色模块
     */
    RoleModule,
    /**
     * 权限模块
     */
    PermissionModule,

    /**
     * 上传模块
     */
    UploadModule,
    /**
     * 文章模块
     */
    PostModule,
    ContentModule,
    MenuModule,
  ],
})
export class AppModule {}
