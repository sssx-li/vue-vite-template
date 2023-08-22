import { Component } from 'vue';

import type { ObjKeysToUnion } from '@/typing';
import type { LangTypes } from '@/i18n/lang/en';
import type { Filter } from '../src/filters/types';

declare module 'vue' {
  interface ComponentCustomProperties extends Component {
    $filters: Filter;
    $t(key: ObjKeysToUnion<LangTypes>): string;
  }
}
