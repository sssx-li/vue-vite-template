import type { App } from 'vue';

export default function filters(app: App) {
  app.config.globalProperties.$filters = {
    dateFormat,
  };
}
