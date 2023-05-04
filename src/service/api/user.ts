import { Request } from '@/service';
import { ILogin } from '../types/user';
import { User } from './index';

export function Login(data: ILogin) {
  return Request.post({
    url: User.LOGIN,
    data,
  });
}

export function getUserInfo() {
  return Request.get({
    url: User.INFO,
  });
}
