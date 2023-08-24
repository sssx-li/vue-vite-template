import { Component } from 'vue';
import type { IFilters } from '../src/filters/types';

import { ObjKeysToUnion } from '@/typing';
import { LangTypes } from '@/i18n/lang/en';

declare module 'vue' {
  interface ComponentCustomProperties extends Component {
    $filters: IFilters;
    $t(key: ObjKeysToUnion<LangTypes>): string;
  }
}
