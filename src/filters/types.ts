import type {
  MaybeRefOrGetter,
  DateLike,
  UseDateFormatOptions,
} from '@vueuse/core';

export interface Filter {
  dateFormat: (
    date: MaybeRefOrGetter<DateLike>,
    format: MaybeRefOrGetter<string>,
    options?: UseDateFormatOptions
  ) => string;
}
