import { ElMessageBox, ElMessageBoxOptions } from 'element-plus';
import 'element-plus/es/components/message-box/style/index';

import i18n from '@/i18n';
const { t } = i18n.global;

interface IConfirm {
  title?: ElMessageBoxOptions['title'];
  content?: ElMessageBoxOptions['message'];
  options?: ElMessageBoxOptions;
}

export function useConfirm(): (options?: IConfirm) => any {
  return (
    params: IConfirm = {
      content: t('tips.tip'),
      title: t('tips.tip'),
      options: {
        type: 'info',
        confirmButtonText: t('tips.ok'),
        cancelButtonText: t('tips.cancel'),
        center: false,
        autofocus: false,
      },
    }
  ) => {
    const { content, title, options } = params;
    return new Promise((resolve) => {
      ElMessageBox.confirm(content, title, options)
        .then(() => {
          resolve(true);
        })
        .catch(() => {});
    });
  };
}
