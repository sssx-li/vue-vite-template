import type { App } from "vue";

export default function filters(app: App) {
  app.config.globalProperties.$filters = {
    dateFormat: (date, format = "YYYY-MM-DD hh:mm:ss", options = {}) => {
      return useDateFormat(date, format, options).value;
    },
  };
}
