import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'normalize.css';
import 'uno.css';
import './styles/index.scss';

import router from './router';
import App from './App.vue';

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
