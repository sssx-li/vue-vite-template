import { ThemeUnion } from '../useSwitchTheme';
import { TLang } from '@/i18n';

export interface ILocalCache {
  token: string;
  theme: ThemeUnion;
  userInfo: { username: string; avatar: string }; // 用户信息
  lang: TLang;
}
export type Keys = keyof ILocalCache;
