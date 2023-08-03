export class ValidationError extends Error {
  constructor(public messages: string[]) {
    super('参数错误');
  }
}
