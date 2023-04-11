import { ObjToUnion } from '@/typing';
import { ThemeUnion } from '../useSwitchTheme';

export interface ILocalCache {
  token: string;
  theme: ThemeUnion;
  userInfo: { username: string; avatar: string }; // 用户信息
}
export type Keys = ObjToUnion<ILocalCache>;

type FilterKeyToValue<T extends keyof ILocalCache> = Pick<ILocalCache, T>[T];

export type TUserInfo = FilterKeyToValue<'userInfo'>;

export type TGetCache = ThemeUnion | TUserInfo | string;
