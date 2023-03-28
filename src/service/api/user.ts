import { Request } from '@/service';
import { ILogin } from '../types';
import { User } from './index';

export function Login(data: ILogin) {
  return Request.post({
    url: User.LOGIN,
    data,
  });
}
