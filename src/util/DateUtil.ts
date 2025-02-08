/**
 * 将时间戳毫秒转为日期字符串
 * @param timestamp 时间戳毫秒
 * @param includeTime 是否包含时间（默认 false，只包含日期）
 */
export function formatDate(
  timestamp: number,
  includeTime: boolean = false,
): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const d = `${year}.${month}.${day}`;
  if (includeTime) {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${d} ${hour}:${minute}:${second}`;
  }
  return d;
}
