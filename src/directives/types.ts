import type { Directive } from 'vue';

export interface Directives {
  vFocus: Directive;
  vDebounce: Directive<
    any,
    {
      type?: 'click' | 'input';
      delay?: number;
      callback: (...args: any[]) => void;
    }
  >;
  vThrottle: Directive<
    any,
    {
      type?: 'click' | 'input';
      delay?: number;
      callback: (...args: any[]) => void;
    }
  >;
}

export type Keys = keyof Directives;
type DirectiveName<T extends Keys> = T extends `v${infer V}`
  ? `${Lowercase<V>}`
  : never;

export interface DirectiveOptions<T extends Keys> {
  name: DirectiveName<T>;
  directive: Directives[T];
}
