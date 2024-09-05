export enum EnumResponseStatusCode {
  success = 0, // 成功
  aborted = 20, // aborted 请求取消
  tokenInvalid = 102, // token过期
}

export enum EnumUser {
  LOGIN = "/login",
  INFO = "/info",
}
