import Mock from 'mockjs';

import { UserEnum } from '@/service/api';
import { useLocalCache } from '@/hooks';
import { createResponse } from '../utils';

import type { MockItem } from '../types';
import type { UserInfo } from '@/service/types';

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

const userMocks: MockItem[] = [
  {
    url: UserEnum.INFO,
    method: 'get',
    response: () => {
      return createResponse<UserInfo>(userInfo);
    },
    options: { timing: 1000 },
  },
  {
    url: UserEnum.LOGIN,
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
