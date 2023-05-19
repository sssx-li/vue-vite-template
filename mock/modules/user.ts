import { User } from '@/service/api';
import { IMock } from '../types';
import { createResponse } from '../utils';
import { IUserInfo } from '@/service/types/user';
import Mock from 'mockjs';
import { useLocalCache } from '@/hooks';

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

const userMocks: IMock[] = [
  {
    url: User.INFO,
    method: 'get',
    response: () => {
      return createResponse<IUserInfo>(userInfo);
    },
    options: { timing: 1000 },
  },
  {
    url: User.LOGIN,
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
