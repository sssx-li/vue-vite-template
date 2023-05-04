export interface ILogin {
  password: string;
  username: string;
}

export interface ILoginRes {
  username: string;
  avatar: string;
}

export interface IUserInfo {
  username: string;
  avatar: string;
  [propName: string]: any;
}
