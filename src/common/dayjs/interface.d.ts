import 'dayjs';

declare module 'dayjs' {
  /**
   * 默认日期时间格式
   */
  export let DATETIME: 'YYYY-MM-DD HH:mm:ss';

  /**
   * 默认日期格式
   */
  export let DATE: 'YYYY-MM-DD';

  /**
   * 默认时间格式
   */
  export let TIME: 'HH:mm:ss';

  interface Dayjs {
    _format: (format?: string) => string;
  }
}
