import type {
  MaybeComputedRef,
  DateLike,
  UseDateFormatOptions,
} from '@vueuse/core';

export type TDateFormat = (
  date: MaybeComputedRef<DateLike>,
  formatStr?: MaybeComputedRef<string>,
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
  date: MaybeComputedRef<DateLike>,
  format: MaybeComputedRef<string> = 'YYYY-MM-DD hh:mm:ss',
  options?: UseDateFormatOptions
) {
  return useDateFormat(date, format, options).value;
}
