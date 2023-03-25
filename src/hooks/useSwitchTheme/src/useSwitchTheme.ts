import { useCssVar } from '@vueuse/core';

import { CssVarUnion, ThemeUnion } from './type';
import { Themes } from './theme';

export function useSwitchTheme(
  el: HTMLElement | Ref<any>,
  type: Ref<ThemeUnion> = ref('defaultTheme')
) {
  const colors: Record<CssVarUnion | string, Ref<any>> = {};
  Object.keys(Themes.defaultTheme).forEach((item) => {
    colors[item] = useCssVar(item, el);
  });
  const switchColor = () => {
    Object.keys(Themes[type.value]).forEach((item) => {
      colors[item].value = Themes[type.value][item as CssVarUnion];
    });
  };
  return {
    switchColor,
  };
}
