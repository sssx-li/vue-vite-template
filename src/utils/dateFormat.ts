import type {
  MaybeRefOrGetter,
  DateLike,
  UseDateFormatOptions,
} from '@vueuse/core';

export type DateFormat = (
  date: MaybeRefOrGetter<DateLike>,
  formatStr?: MaybeRefOrGetter<string>,
  options?: UseDateFormatOptions
) => string;

/**
 *
 * @param date 日期：string | number | Date
 * @param format 按format对日期进行格式化
 * @param options 配置项
 * @returns
 */
export function dateFormat(
  date: MaybeRefOrGetter<DateLike>,
  format: MaybeRefOrGetter<string> = 'YYYY-MM-DD hh:mm:ss',
  options?: UseDateFormatOptions
) {
  return useDateFormat(date, format, options).value;
}
