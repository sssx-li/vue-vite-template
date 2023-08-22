import { Component } from 'vue';

import type { ObjKeysToUnion } from '@/typing';
import type { LangTypes } from '@/i18n/lang/en';
import type { IFilter } from '../src/filters/types';

declare module 'vue' {
  interface ComponentCustomProperties extends Component {
    $filters: IFilter;
    $t(key: ObjKeysToUnion<LangTypes>): string;
  }
}
