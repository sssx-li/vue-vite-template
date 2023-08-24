import type { UserLogin } from '../types';

export function Login(data: UserLogin) {
  return ApiRequest.post({
    url: UserEnum.LOGIN,
    data,
  });
}

export function getUserInfo() {
  return ApiRequest.get({
    url: UserEnum.INFO,
  });
}
