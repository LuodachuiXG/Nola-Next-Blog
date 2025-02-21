import { addToast } from '@heroui/toast';

/**
 * Toast
 * @param message 消息
 * @param type 类型
 * @param timeout 显示时间
 */
export function toast(
  message: string,
  type: 'default' | 'primary' | 'success' | 'danger' = 'default',
  timeout: number =  3000
) {
  addToast({
    title: '提示',
    description: message,
    color: type,
    timeout: timeout
  });
}
