import 'virtual:svg-icons-register';

import 'normalize.css';
import 'uno.css';
import './styles/index.scss';
// 暗黑主题部分样式
import 'element-plus/theme-chalk/dark/css-vars.css';

import router from './permission';
import store from './store';
import directives from './directives';
import filters from './filters';
import i18n from './i18n';

import App from './App.vue';
import { setupMock } from '../mock';
const app = createApp(App);

(async () => {
  await setupMock();
  app.use(store);
  app.use(router);
  await app.use(directives);
  app.use(filters);
  app.use(i18n);
  app.mount('#app');
})();
