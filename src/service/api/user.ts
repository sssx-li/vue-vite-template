import type { Login } from '../types';

export function useLogin(data: Login) {
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
