declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * 运行端口
     */
    SERVER_PORT: number;
    /**
     * 运行IP
     */
    SERVER_HOST: string;
    /**
     * 项目根目录路径
     */
    ROOT_PATH: string;
    /**
     * 环境变量
     */
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
