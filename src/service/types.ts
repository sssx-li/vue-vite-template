export interface IFeatchParams {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

export interface ILogin {
  password: string;
  username: string;
}

export interface ILoginRes {
  username: string;
  avatar: string;
}
