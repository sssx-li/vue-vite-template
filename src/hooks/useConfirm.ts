import { ElMessageBox, ElMessageBoxOptions } from 'element-plus';
import 'element-plus/es/components/message-box/style/index';

interface Confirm {
  title?: ElMessageBoxOptions['title'];
  content?: ElMessageBoxOptions['message'];
  options?: ElMessageBoxOptions;
}

export function useConfirm(): (options?: Confirm) => any {
  return (
    params: Confirm = {
      content: '提示',
      title: '提示',
      options: {
        type: 'info',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
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
