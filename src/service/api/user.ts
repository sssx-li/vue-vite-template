import { Request } from '@/service';
import { UserEnum } from './index';

import type { UserLogin } from '../types';

export function Login(data: UserLogin) {
  return Request.post({
    url: UserEnum.LOGIN,
    data,
  });
}

export function getUserInfo() {
  return Request.get({
    url: UserEnum.INFO,
  });
}
