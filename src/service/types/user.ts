export interface IUserLogin {
  password: string;
  username: string;
}

export interface IUserLoginRes {
  token: string;
}

export interface IUserInfo {
  username: string;
  avatar: string;
  [propName: string]: any;
}
