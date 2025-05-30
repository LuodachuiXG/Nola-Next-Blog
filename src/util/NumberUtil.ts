/**
 * 字符串转数字
 * @param str 字符串
 * @param defaultValue 默认值（默认 0）
 */
export function stringToNumber(
  str: string | null | undefined,
  defaultValue: number = 0,
) {
  if (!str) return defaultValue;
  return Number.isNaN(Number(str)) ? defaultValue : Number(str);
}

/**
 * 判断是否是数字
 * @param str 字符串
 */
export function isNumber(str: string | number | null | undefined): boolean {
  if (!str) return false;
  return !Number.isNaN(Number(str));
}
