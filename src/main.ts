import 'virtual:svg-icons-register';

import 'normalize.css';
import 'uno.css';
import './styles/index.scss';

import router from './permission';
import store from './store';
import directives from './directives';
import filters from './filters';

import App from './App.vue';
import { setupMock } from './mock';
const app = createApp(App);

(async () => {
  if (import.meta.env.VITE_MOCK_ENV) {
    await setupMock();
  }
  app.use(store);
  app.use(router);
  await app.use(directives);
  app.use(filters);
  app.mount('#app');
})();
