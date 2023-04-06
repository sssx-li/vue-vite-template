import { ObjToUnion } from '@/typing';
import { ThemeUnion } from '../useSwitchTheme';

export interface ILocalCache {
  token: string;
  theme: ThemeUnion;
  userInfo: { username: string; avatar: string }; // 用户信息
}
export type Keys = ObjToUnion<ILocalCache>;

export type TUserInfo = Pick<ILocalCache, 'userInfo'>['userInfo'];

export type TGetCache = ThemeUnion | TUserInfo | string;
