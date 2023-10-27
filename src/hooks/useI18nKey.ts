import i18n from '@/i18n';

import type { LangTypes } from '@/i18n/lang/en';
import type { ObjKeysToUnion } from '@/typing';

/**
 * useI18nKey
 *
 *  1.补全 useI18n 导出 t 函数的参数类型
 *
 *  2.兼容在非setup组件的使用环境
 *
 * @param key
 * @param setupEev 使用环境是否为setup，否则使用i18n.global.t(t)作为替代方案
 * @returns
 */
export function useI18nKey(key: ObjKeysToUnion<LangTypes>, setupEev = true) {
  if (!setupEev) {
    return i18n.global.t(key);
  }
  const { t, locale } = useI18n();
  const text = ref(t(key));
  watch(locale, () => {
    text.value = t(key);
  });
  return text;
}
