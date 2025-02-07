// 每页条数数组
import { isNumber } from '@/util/NumberUtil';

export const PAGE_SIZE_LIST = [10, 20, 40, 70, 100, 120];

/**
 * 判断给定的每页大小是否在每页条数数组中
 * @param size 每页大小
 */
export function isInPageSizeList(
  size: number | string | null | undefined,
): boolean {
  if (!size) return false;
  if (!isNumber(size)) return false;
  return PAGE_SIZE_LIST.includes(Number(size));
}
