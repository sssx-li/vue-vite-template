import type { TThemeTypes } from './useTheme';
import type { TLangType } from '@/i18n';

const defCache = {
  token: '',
  theme: 'defaultTheme' as TThemeTypes,
  userInfo: { username: '', avatar: '' },
  lang: 'zh' as TLangType,
};

type TLocalCacheValueType = typeof defCache;
type TKeys = keyof TLocalCacheValueType;

export function useLocalCache() {
  // 1.获取cache
  function getCache<T extends TKeys>(key: T): TLocalCacheValueType[T] {
    return useLocalStorage(key, defCache[key]).value;
  }
  // 2.设置cache
  function setCache<T extends TKeys>(key: T, value: TLocalCacheValueType[T]) {
    useLocalStorage(key, defCache[key]).value = value;
  }
  // 3.移除cache
  function removeCache(key: TKeys) {
    useLocalStorage(key, defCache[key]).value = null;
  }
  // 4.清除所有cache
  function clearCache() {
    localStorage.clear();
  }
  return { getCache, setCache, removeCache, clearCache };
}
