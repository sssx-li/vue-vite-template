export enum ResponseStatusCodeEnum {
  success = 0, // 成功
  aborted = 20, // aborted 请求取消
  tokenInvalid = 102, // token过期
}

export enum UserEnum {
  LOGIN = "/login",
  INFO = "/info",
}
