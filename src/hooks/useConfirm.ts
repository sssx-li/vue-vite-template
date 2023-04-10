import { ElMessageBox, ElMessageBoxOptions } from 'element-plus';

import 'element-plus/es/components/message-box/style/index';

interface IConfirm {
  title?: ElMessageBoxOptions['title'];
  content?: ElMessageBoxOptions['message'];
  options?: ElMessageBoxOptions;
}

export function useConfirm(): (options?: IConfirm) => any {
  return (
    params: IConfirm = {
      content: '提示内容',
      title: '提示',
      options: {
        type: 'info',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: false,
        autofocus: false,
      },
    }
  ) => {
    const { content, title, options } = params;
    return new Promise((resolve) => {
      ElMessageBox.confirm(content, title, options).then(() => {
        resolve(true);
      });
    });
  };
}
