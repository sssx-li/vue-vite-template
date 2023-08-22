import { Request } from '@/service';
import { UserEnum } from './index';

import type { UserLogin } from '../types';

export function userLogin(data: UserLogin) {
  return Request.post({
    url: UserEnum.LOGIN,
    data,
  });
}

export function userGetUserInfo() {
  return Request.get({
    url: UserEnum.INFO,
  });
}
