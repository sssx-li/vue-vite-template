import { useLocalStorage } from '@vueuse/core';
import { ILocalCache, Keys } from './type';

const defCache: ILocalCache = {
  token: '',
  theme: 'defaultTheme',
  userInfo: { username: '', avatar: '' },
  lang: 'zh',
};

export function useLocalCache() {
  // 1.获取cache
  function getCache<T extends Keys>(key: T): ILocalCache[T] {
    return useLocalStorage(key, defCache[key]).value;
  }
  // 2.设置cache
  function setCache<T extends Keys>(key: T, value: ILocalCache[T]) {
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
