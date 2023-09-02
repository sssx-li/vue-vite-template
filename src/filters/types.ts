import type {
  MaybeComputedRef,
  DateLike,
  UseDateFormatOptions,
} from '@vueuse/core';

export type DateFormat = (
  date: MaybeComputedRef<DateLike>,
  formatStr?: MaybeComputedRef<string>,
  options?: UseDateFormatOptions
) => string;
