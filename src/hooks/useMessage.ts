import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/index';

/**
 *
 * @param offset Message 距离窗口顶部的偏移量
 * @param showClose 是否显示关闭图标(可手动关闭消息)
 * @param center 是否居中
 * @param appendTo 设置组件的根元素
 *    @param message 提示内容
 *    @param duration 显示时间，单位为毫秒(设为 0 则不会自动关闭)
 *    @param grouping 合并内容相同的消息
 * @returns
 */
export function useMessage(
  offset = 20,
  showClose = false,
  center = false,
  appendTo: string | HTMLElement = document.body
) {
  const success = (message: string, duration?: number, grouping = false) => {
    return ElMessage.success({
      message,
      duration,
      showClose,
      center,
      grouping,
      offset,
      appendTo,
    });
  };
  const error = (message: string, duration?: number, grouping = false) => {
    return ElMessage.error({
      message,
      duration,
      showClose,
      center,
      grouping,
      offset,
      appendTo,
    });
  };
  const info = (message: string, duration?: number, grouping = false) => {
    return ElMessage.info({
      message,
      duration,
      showClose,
      center,
      grouping,
      offset,
      appendTo,
    });
  };
  const warning = (message: string, duration?: number, grouping = false) => {
    return ElMessage.warning({
      message,
      duration,
      showClose,
      center,
      grouping,
      offset,
      appendTo,
    });
  };
  const closeAll = () => {
    ElMessage.closeAll();
  };

  return {
    success,
    error,
    info,
    warning,
    closeAll,
  };
}
