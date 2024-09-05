import type { IUserLogin } from '../types';

export function apiUseLogin(data: IUserLogin) {
  return ApiRequest.post({
    url: EnumUser.LOGIN,
    data,
  });
}

export function apiUseGetUserInfo() {
  return ApiRequest.get({
    url: EnumUser.INFO,
  });
}
