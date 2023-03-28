export * from './user';

export enum responseStatusCode {
  success = 0, // 成功
  tokenInvalid = 102, // token过期
}

export enum User {
  LOGIN = '/login',
}
