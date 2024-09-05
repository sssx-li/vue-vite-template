import type { Directive } from 'vue';

type TEventTypes = 'click' | 'input';

export interface IELType extends HTMLElement {
  __fn__: () => any;
}

export interface TDirectives {
  vFocus: Directive;
  vDebounce: Directive<
    any,
    {
      type?: TEventTypes;
      delay?: number;
      callback: (...args: any[]) => void;
    }
  >;
  vThrottle: Directive<
    any,
    {
      type?: TEventTypes;
      delay?: number;
      callback: (...args: any[]) => void;
    }
  >;
}

export type TKeys = keyof TDirectives;

type ILowerDirectiveName<T extends TKeys> = T extends `v${infer V}`
  ? Lowercase<V>
  : never;

export interface IDirectiveOptions<T extends TKeys> {
  name: ILowerDirectiveName<T>;
  directive: TDirectives[T];
}
