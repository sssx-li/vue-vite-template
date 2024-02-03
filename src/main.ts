import "virtual:svg-icons-register";

import "normalize.css";
import "uno.css";
import "./styles/index.scss";

import router from "./router";
import store from "./store";
import directives from "./directives";
import filters from "./filters";
import i18n from "./i18n";

import App from "./App.vue";
import { setupMock } from "../mock";
const app = createApp(App);

(async () => {
  await app.use(directives);
  await setupMock();
  app.use(store);
  app.use(router);
  app.use(filters);
  app.use(i18n);
  app.mount("#app");
})();
