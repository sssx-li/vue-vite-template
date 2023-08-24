import type { ThemeTypes } from './useTheme';
import type { LangTypes } from '@/i18n';

const defCache = {
  token: '',
  theme: 'defaultTheme' as ThemeTypes,
  userInfo: { username: '', avatar: '' },
  lang: 'zh' as LangTypes,
};

type LocalCacheValueType = typeof defCache;
type Keys = keyof LocalCacheValueType;

export function useLocalCache() {
  // 1.获取cache
  function getCache<T extends Keys>(key: T): LocalCacheValueType[T] {
    return useLocalStorage(key, defCache[key]).value;
  }
  // 2.设置cache
  function setCache<T extends Keys>(key: T, value: LocalCacheValueType[T]) {
    useLocalStorage(key, defCache[key]).value = value;
  }
  // 3.移除cache
  function removeCache(key: Keys) {
    useLocalStorage(key, defCache[key]).value = null;
  }
  // 4.清除所有cache
  function clearCache() {
    localStorage.clear();
  }
  return { getCache, setCache, removeCache, clearCache };
}
