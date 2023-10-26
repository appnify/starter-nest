import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

/**
 * 使用中文语言包
 */
dayjs.locale('zh-cn');

/**
 * 使用相对时间插件
 * @see https://dayjs.gitee.io/docs/zh-CN/plugin/relative-time
 */
dayjs.extend(relativeTime);

/**
 * 默认时间格式
 */
dayjs.DATETIME = 'YYYY-MM-DD HH:mm:ss';

/**
 * 默认日期格式
 */
dayjs.DATE = 'YYYY-MM-DD';

/**
 * 默认时间格式
 */
dayjs.TIME = 'HH:mm:ss';

/**
 * 保存原始的format方法
 */
dayjs.prototype._format = dayjs.prototype.format;

/**
 * 重写format方法，如果没有传入format参数，则使用默认的时间格式
 */
dayjs.prototype.format = function (format = dayjs.DATETIME) {
  return this._format(format);
};

export { dayjs };
