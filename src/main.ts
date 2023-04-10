import 'normalize.css';
import 'uno.css';
import './styles/index.scss';

import router from './router';
import store from './store';
import directives from './directives';
import filters from './filters';

import App from './App.vue';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(directives);
app.use(filters);
app.mount('#app');
