import { Component } from 'vue';

import type { Filter } from '../src/filters/types';

import { ObjKeysToUnion } from '@/typing';
import { TLangConfig } from '@/i18n/lang/en';

declare module 'vue' {
  interface ComponentCustomProperties extends Component {
    $filters: Filter;
    $t(key: ObjKeysToUnion<TLangConfig>): string;
  }
}
