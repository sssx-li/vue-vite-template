import { useLocalCache, useMessage } from '@/hooks';
import { responseStatusCode } from './api';
import Fetch from './fetch';
import i18n from '@/i18n';
const { t } = i18n.global;

const { getCache, clearCache } = useLocalCache();
const { error } = useMessage();
const whiteApis = ['/login']; // 接口白名单

export const Request = new Fetch({
  baseUrl: import.meta.env.VITE_BASE_URL,
  options: {
    beforeFetch({ options, cancel, url }) {
      const token = getCache('token');
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
        error(t('requestErrorTips.login_expired'));
        clearCache();
        location.reload();
      } else if (code !== responseStatusCode.success) {
        error(message || t('requestErrorTips.request_failed'));
      }
      return ctx;
    },
    onFetchError(ctx) {
      console.log('ctx', ctx);
      const { code, message } = ctx.error;
      if (code === responseStatusCode.aborted) {
        error(message || t('requestErrorTips.request_canceled'));
      } else {
        error(t('requestErrorTips.require_error'));
      }
      return ctx;
    },
    timeout: 10000,
  },
});
