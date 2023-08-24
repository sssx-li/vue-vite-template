import type { UserLogin } from '../types';

export function userLogin(data: UserLogin) {
  return ApiRequest.post({
    url: UserEnum.LOGIN,
    data,
  });
}

export function userGetUserInfo() {
  return ApiRequest.get({
    url: UserEnum.INFO,
  });
}
