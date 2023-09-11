import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { LegacyButtonType } from 'ant-design-vue/es/button/buttonTypes';
import 'ant-design-vue/es/modal/style/css';

export interface Config {
  title?: string;
  content?: string;
  okText?: string;
  cancelText?: string;
  okType?: LegacyButtonType;
}

export function useConfirm(): (obj?: Config) => Promise<any> {
  return (params = {}) => {
    const {
      title = '提示',
      content = '提示',
      cancelText = '取消',
      okText = '确认',
      okType = 'default',
    } = params;
    return new Promise((resolve) => {
      Modal.confirm({
        title,
        icon: createVNode(ExclamationCircleOutlined),
        content,
        okText,
        cancelText,
        okType,
        onOk: () => {
          resolve(true);
        },
        onCancel: () => {},
      });
    });
  };
}
