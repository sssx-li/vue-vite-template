import Mock from 'mockjs';

import { createResponse } from '../utils';

import type { IMockItem } from '../types';
import type { IUserInfo } from '@/service/types';

const { getCache, setCache } = useLocalCache();

const loginRes = Mock.mock({
  'token|30': /[a-zA-Z0-9]/,
});

const userInfo = Mock.mock({
  username: '@cname',
  avatar: '',
});
const cacheUserInfo = getCache('userInfo');
if (cacheUserInfo.username) {
  userInfo.username = cacheUserInfo.username;
}

const userMocks: IMockItem[] = [
  {
    url: EnumUser.INFO,
    method: 'get',
    response: () => {
      return createResponse<IUserInfo>(userInfo);
    },
    options: { timing: 1000 },
  },
  {
    url: EnumUser.LOGIN,
    method: 'post',
    response: (schema, request) => {
      const body = JSON.parse(request.requestBody);
      userInfo.username = body.username;
      setCache('userInfo', userInfo);
      return createResponse(loginRes);
    },
    options: { timing: 2000 },
  },
];

export default userMocks;
