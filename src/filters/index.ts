import type { App } from 'vue';
import { dateFormat } from '@/utils';

export default function filters(app: App) {
  app.config.globalProperties.$filters = {
    dateFormat,
  };
}
