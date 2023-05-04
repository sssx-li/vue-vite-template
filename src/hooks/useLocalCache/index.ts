import { useLocalStorage } from '@vueuse/core';
import { ILocalCache, Keys, TGetCache } from './type';
import { ThemeUnion } from '../useSwitchTheme';

const defCache: ILocalCache = {
  token: '',
  theme: 'defaultTheme',
  userInfo: { username: '', avatar: '' },
};

export function useLocalCache() {
  // 1.获取cache
  function getCache(key: 'token'): string;
  function getCache(key: 'theme'): ThemeUnion;
  function getCache(key: 'userInfo'): ILocalCache['userInfo'];
  function getCache(key: Keys): TGetCache {
    return useLocalStorage(key, defCache[key]).value;
  }
  // 2.设置cache
  function setCache(key: 'token', value: string): void;
  function setCache(key: 'theme', value: ThemeUnion): void;
  function setCache(key: 'userInfo', value: ILocalCache['userInfo']): void;
  function setCache(key: Keys, value: any) {
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
