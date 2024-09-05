import { DateLike } from "@vueuse/core";
import type { App, MaybeRefOrGetter } from "vue";

export default function filters(app: App) {
  app.config.globalProperties.$filters = {
    dateFormat: (
      date: MaybeRefOrGetter<DateLike>,
      format = "YYYY-MM-DD hh:mm:ss",
      options = {}
    ) => {
      return useDateFormat(date, format, options).value;
    },
  };
}
