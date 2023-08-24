import { createI18n } from 'vue-i18n';

import zh from './lang/zh';
import en from './lang/en';

const { getCache } = useLocalCache();

const messages = {
  en,
  zh,
};

export type LangTypes = keyof typeof messages;

const i18n = createI18n({
  locale: getCache('lang'),
  fallbackLocale: 'zh', // 设置备用                                                                                                                                                                                               语言
  legacy: false, // 使用Composition API,必须将其设置为false
  messages,
});

export default i18n;
