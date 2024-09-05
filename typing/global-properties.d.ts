import { Component } from "vue";

import type { TObjKeysToUnion } from "@/typing";
import type { TLangTypes } from "@/i18n/lang/en";
import type { IFilter } from "@/filters/types";
import type { Directives } from "@/directives/types";

declare module "vue" {
  interface ComponentCustomProperties extends Component, Directives {
    $filters: IFilter;
    $t(key: TObjKeysToUnion<TLangTypes>): string;
  }
}
