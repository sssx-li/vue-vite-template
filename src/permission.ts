import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

import router from '@/router';
import { useLocalCache } from './hooks';

router.beforeEach((to, from, next) => {
  NProgress.start();
  const token = useLocalCache().getCache('token');
  const isToLogin = to.path === '/login';
  if (token) {
    if (isToLogin) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (!isToLogin) {
      next({ path: '/login' });
      NProgress.done();
    } else {
      next();
    }
  }
});
router.beforeEach(() => {
  NProgress.done();
});

export default router;
