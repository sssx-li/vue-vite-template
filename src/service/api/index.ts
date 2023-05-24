export * from './user';

export enum responseStatusCode {
  success = 0, // 成功
  aborted = 20, // aborted 请求取消
  tokenInvalid = 102, // token过期
}

export enum User {
  LOGIN = '/login',
  INFO = '/info',
}

export enum Table {
  LIST = '/list',
}
