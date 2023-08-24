import type { UserLogin } from '../types';

export function useLogin(data: UserLogin) {
  return ApiRequest.post({
    url: UserEnum.LOGIN,
    data,
  });
}

export function useGetUserInfo() {
  return ApiRequest.get({
    url: UserEnum.INFO,
  });
}
