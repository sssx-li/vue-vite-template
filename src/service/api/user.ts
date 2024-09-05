import type { IUserLogin } from "../types";

export function userLogin(data: IUserLogin) {
  return ApiRequest.post({
    url: EnumUser.LOGIN,
    data,
  });
}

export function userGetUserInfo() {
  return ApiRequest.get({
    url: EnumUser.INFO,
  });
}
