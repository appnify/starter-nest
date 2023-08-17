import 'express';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

declare module 'express' {
  interface Request {
    user?: {
      id: number;
      username: string;
      nickname: string;
    };
  }
}
