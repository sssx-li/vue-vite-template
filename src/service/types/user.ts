export interface ILogin {
  password: string;
  username: string;
}

export interface ILoginRes {
  token: string;
}

export interface IUserInfo {
  username: string;
  avatar: string;
  [propName: string]: any;
}
