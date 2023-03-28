import localCache from '@/utils/localCache';
import { responseStatusCode } from './api';
import Fetch from './fetch';

const whiteApis = ['/user/login', 'uurm/v1/public/applicationInfo']; // 接口白名单

export const Request = new Fetch({
  baseUrl: import.meta.env.VITE_BASE_URL,
  options: {
    beforeFetch({ options, cancel, url }) {
      const token = localCache.getCache('token');
      if (!whiteApis.find((item) => url.includes(item)) && !token) {
        cancel();
      }
      options.headers = {
        ...options.headers,
        Authorization: token,
      };
      return { options };
    },
    afterFetch(ctx) {
      // 这里做统一错误处理
      const { code, message } = ctx.data;
      if (code === responseStatusCode.tokenInvalid) {
        console.log('登录过期，请重新登录');
        localCache.clearCache();
        location.reload();
      } else if (code !== responseStatusCode.success) {
        console.log(message || '请求失败，请稍后再试');
      }
      return ctx;
    },
    onFetchError(ctx) {
      // 错误请求
      console.log('错误的请求，请稍后再试');
      return ctx;
    },
    timeout: 10000,
  },
});
