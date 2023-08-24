export interface Login {
  password: string;
  username: string;
}

export interface UserLoginRes {
  token: string;
}

export interface UserInfo {
  username: string;
  avatar: string;
  [propName: string]: any;
}
