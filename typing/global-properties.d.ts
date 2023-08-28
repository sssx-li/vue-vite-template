import { Component } from 'vue';

import type { ObjKeysToUnion } from '@/typing';
import type { LangTypes } from '@/i18n/lang/en';
import type { Filter } from '@/filters/types';
import type { Directives } from '@/directives/types';

declare module 'vue' {
  interface ComponentCustomProperties extends Component, Directives {
    $filters: Filter;
    $t(key: ObjKeysToUnion<LangTypes>): string;
  }
}
