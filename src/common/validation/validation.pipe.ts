import { ValidationPipe } from '@nestjs/common';
import { AppValidationError } from './validation.error';

const MessageMap = {
  isString: '必须为字符串',
  isNumber: '必须为数字',
  isBoolean: '必须为布尔值',
  isDate: '必须为日期',
  isEnum: '必须为枚举值',
  isNotEmpty: '不能为空',
  isNotEmptyObject: '不能为空对象',
  isNotEmptyString: '不能为空字符串',
  isNotEmptyArray: '不能为空数组',
  isNotEmptyMap: '不能为空Map',
  isNotEmptySet: '不能为空Set',
  isNotEmptyDate: '不能为空日期',
  isNotEmptyNumber: '不能为空数字',
  isNotEmptyBoolean: '不能为空布尔值',
  isNotEmptyFunction: '不能为空函数',
  isNotEmptySymbol: '不能为空Symbol',
  isNotEmptyPromise: '不能为空Promise',
  isNotEmptyObservable: '不能为空Observable',
};

export const validationPipeFactory = () => {
  return new ValidationPipe({
    transform: true,
    whitelist: true,
    exceptionFactory: (errors) => {
      const error = new AppValidationError('参数错误');
      const messages: string[] = [];
      for (const error of errors) {
        const { property, constraints } = error;
        Object.keys(constraints).forEach((key) => {
          messages.push(MessageMap[key] ? `参数(${property})${MessageMap[key]}` : constraints[key]);
        });
      }
      error.setMessages(messages);
      return error;
    },
  });
};
