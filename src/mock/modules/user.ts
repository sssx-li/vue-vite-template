import { User } from '@/service/api';
import { IMock } from '../types';
import { createResponse } from '../utils';
import { IUserInfo } from '@/service/types/user';

function generateRandomString(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const userMocks: IMock[] = [
  {
    url: User.INFO,
    method: 'get',
    response: () => {
      return createResponse<IUserInfo>({ username: 'sssx', avatar: '' });
    },
    options: { timing: 3000 },
  },
  {
    url: User.LOGIN,
    method: 'post',
    response: () => {
      return createResponse({
        token: generateRandomString(30),
      });
    },
    options: { timing: 100 },
  },
];

export default userMocks;