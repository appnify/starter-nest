## 接口文档

1. 安装依赖

```
pnpm i @nestjs/swagger
```

2. 修改`src/main.ts`文件

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('接口文档')
  .setVersion('1.0')
  .setDescription('Openapi 3.0文档')
  .setExternalDoc('JSON数据', '/openapi-json')
  .addTag('用户管理', 'user')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('openapi', app, document);
```

3. 修改`nest-cli.json`文件

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          "introspectComments": true
        }
      }
    ]
  }
}
```

## 配置文件

1. 安装依赖

```shell
pnpm i @nestjs/config
```

2. 修改`src/app.module.ts`文件

```typescript
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true
}),
```

## 源码分析

入口

```typescript
export const NestFactory = new NestFactoryStatic();
```

创建 1 个 ApplicationConfig 实例，存放全局拦截器、管道、异常过滤器等。

```typescript
export class ApplicationConfig {
  private globalPrefix = '';
  private globalPrefixOptions: GlobalPrefixOptions<ExcludeRouteMetadata> = {};
  private globalPipes: Array<PipeTransform> = [];
  private globalFilters: Array<ExceptionFilter> = [];
  private globalInterceptors: Array<NestInterceptor> = [];
  private globalGuards: Array<CanActivate> = [];
  private versioningOptions: VersioningOptions;
  private readonly globalRequestPipes: InstanceWrapper<PipeTransform>[] = [];
  private readonly globalRequestFilters: InstanceWrapper<ExceptionFilter>[] = [];
  private readonly globalRequestInterceptors: InstanceWrapper<NestInterceptor>[] = [];
  private readonly globalRequestGuards: InstanceWrapper<CanActivate>[] = [];
  constructor(private ioAdapter: WebSocketAdapter | null = null) {}
  // ...
}
```

创建 1 个 NestContainer 实例(即 IOC 容器), 并传入 applicationConfig，存放 modules(模块)等。

```typescript
export class NestContainer {
  private readonly globalModules = new Set<Module>();
  private readonly moduleTokenFactory = new ModuleTokenFactory();
  private readonly moduleCompiler = new ModuleCompiler(this.moduleTokenFactory);
  private readonly modules = new ModulesContainer();
  private readonly dynamicModulesMetadata = new Map<string, Partial<DynamicModule>>();
  private readonly internalProvidersStorage = new InternalProvidersStorage();
  private readonly _serializedGraph = new SerializedGraph();
  private internalCoreModule: Module;
}
```

执行 this.initialize 初始化，从根模块开始扫描：

```typescript
private async initialize(
  module: any,
  container: NestContainer,
  graphInspector: GraphInspector,
  config = new ApplicationConfig(),
  options: NestApplicationContextOptions = {},
  httpServer: HttpServer = null,
) {
  const injector = new Injector({ preview: options.preview });
  const instanceLoader = new InstanceLoader(container,injector,graphInspector,);
  const metadataScanner = new MetadataScanner();
  const dependenciesScanner = new DependenciesScanner(container,metadataScanner,graphInspector,config,);
  const teardown = this.abortOnError === false ? rethrow : undefined;

  container.setHttpAdapter(httpServer);
  await httpServer?.init();

  try {
    this.logger.log(MESSAGES.APPLICATION_START);

    await ExceptionsZone.asyncRun(
      async () => {
        await dependenciesScanner.scan(module);
        await instanceLoader.createInstancesOfDependencies();
        dependenciesScanner.applyApplicationProviders();
      },
      teardown,
      this.autoFlushLogs,
    );
  } catch (e) {
    this.handleInitializationError(e);
  }
}
```

```
NestFactory.create传入1到3个参数：根模块，HTTP适配器，参数, 执行以下过程




1. 扫描到到controller的方法时，创建1个执行环境，注入管道、拦截器等内容
nestjs/nest/packages/core/router/router-execution-context.ts

2. 扫描到名为APP_PIPE等provider时，向application注入全局
nestjs/nest/packages/core/scanner.ts

创建1个NestApplication实例，包含对底层的一些封装，例如监听端口、使用全局拦截器等方法。

```

创建 1 个对 NestApplication 的代理(target)，对所有方法包裹一层异常捕获，核心代码：

```typescript
// file: nestjs/nest/packages/core/router/router-execution-context.ts
if (isFunction(receiver[prop])) {
  return this.createExceptionZone(receiver, prop);
}
```

创建 1 个对 target 和 httpServer 的代理，如果 target 上调用的方法时，则尝试调用 httpServer 上的方法，核心代码：

```typescript
// nestjs/nest/packages/core/nest-factory.ts
if (!(prop in receiver) && prop in adapter) {
  return (...args: unknown[]) => {
    const result = this.createExceptionZone(adapter, prop)(...args);
    return mapToProxy(result);
  };
}
```
## TODO
- media video image text audio
- name size author path
- user
- tag color place thing
- category