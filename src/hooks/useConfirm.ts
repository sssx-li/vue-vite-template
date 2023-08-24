import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { LegacyButtonType } from 'ant-design-vue/es/button/buttonTypes';
import 'ant-design-vue/es/modal/style/css';

import i18n from '@/i18n';
const { t } = i18n.global;

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
      title = t('tips.tip'),
      content = t('tips.tip'),
      cancelText = t('tips.cancel'),
      okText = t('tips.ok'),
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
