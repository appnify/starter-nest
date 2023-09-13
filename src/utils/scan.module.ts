import { DynamicModule, INestApplication, Module } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService, MetadataScanner, NestContainer } from '@nestjs/core';
import {
  Entrypoint,
  HttpEntrypointMetadata,
  MiddlewareEntrypointMetadata,
} from '@nestjs/core/inspector/interfaces/entrypoint.interface';

@Module({})
export class ScanModule {
  /**
   * 是否启用
   */
  static enable = Boolean(process.env.xx);

  /**
   * 注册模块
   */
  static forRoot(): DynamicModule {
    return {
      module: ScanModule,
      imports: ScanModule.enable ? [DiscoveryModule] : undefined,
    };
  }

  /**
   * 扫描路由/装饰器参数等信息
   * @param app 应用实例
   */
  static scan(app: INestApplication) {
    if (!ScanModule.enable) {
      return;
    }

    const container = (app as any).container as NestContainer;
    const graph1 = container.serializedGraph.toJSON();
    const entries = Object.values(graph1.entrypoints).flat();
    for (const entry of entries) {
      if (ScanModule.isHttpEntryPoint(entry)) {
        console.log(entry.metadata.path);
      }
      if (ScanModule.isMiddlewareEntryPoint(entry)) {
        console.log(entry.metadata.path);
      }
    }

    const scanner = app.get(MetadataScanner);
    const discover = app.get(DiscoveryService);
    const controllers = discover.getControllers();
    for (const wrapper of controllers) {
      const prototype = Object.getPrototypeOf(wrapper.instance);
      const methodNames = scanner.getAllMethodNames(prototype);
      console.log('method names:', methodNames);
      const metakeys = Reflect.getMetadataKeys(prototype);
      console.log('controller meta keys:', metakeys);
      for (const methodName of methodNames) {
        const metadata = Reflect.getMetadataKeys(prototype[methodName]);
        console.log('method meta keys:', metadata);
      }
    }
  }

  /**
   * 检查是否HTTP端点
   */
  static isHttpEntryPoint(input: Entrypoint<unknown>): input is Entrypoint<HttpEntrypointMetadata> {
    return input.type === 'http-endpoint';
  }

  /**
   * 检查是否中间件端点
   */
  static isMiddlewareEntryPoint(input: Entrypoint<unknown>): input is Entrypoint<MiddlewareEntrypointMetadata> {
    return input.type === 'middleware';
  }
}
