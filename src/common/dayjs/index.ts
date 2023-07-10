import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

export const DATETIME = 'YYYY-MM-DD HH:mm:ss';

export const DATE = 'YYYY-MM-DD';

export const TIME = 'HH:mm:ss';

/**
 * 中文语言包
 */
dayjs.locale('zh-cn');

/**
 * 相对时间插件
 * @see https://dayjs.gitee.io/docs/zh-CN/plugin/relative-time
 */
dayjs.extend(relativeTime);

/**
 *
 * 默认时间格式
 */
dayjs.DATETIME = DATETIME;

/**
 * 默认日期格式
 */
dayjs.DATE = DATE;

/**
 * 默认时间格式
 */
dayjs.TIME = TIME;

/**
 * 重写format方法，如果没有传入format参数，则使用默认的时间格式
 */
dayjs.prototype._format = dayjs.prototype.format;
dayjs.prototype.format = function (format?: string) {
  if (format) {
    return this._format(format);
  }
  return this._format(dayjs.DATETIME);
};

export { dayjs };
