// 一分钟
const minute = 60 * 1000;
// 一个小时
const hour = 60 * minute;
// 一天
const day = 24 * hour;
// 一个月
const month = 30 * day;

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
  const d = `${year} 年 ${month} 月 ${day} 日`;
  if (includeTime) {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${d} ${hour}:${minute}:${second}`;
  }
  return d;
}

/**
 * 将时间戳转为文字描述
 * @param timestamp 时间戳毫秒
 */
export function formatDateDesc(timestamp: number): string {
  const now = Date.now();
  // 小于 10 分钟
  if (now - timestamp < 10 * minute) {
    return '刚刚';
  }

  // 小于 1 小时
  if (now - timestamp < hour) {
    const minutes = Math.floor((now - timestamp) / minute);
    return `${minutes} 分钟前`;
  }

  // 小于 1 天
  if (now - timestamp < day) {
    const hours = Math.floor((now - timestamp) / hour);
    return `${hours} 小时前`;
  }

  // 小于 1 个月
  if (now - timestamp < month) {
    const days = Math.floor((now - timestamp) / day);
    return `${days} 天前`;
  }

  // 小于 1 年
  if (now - timestamp < month * 12) {
    const months = Math.floor((now - timestamp) / month);
    return `${months} 个月前`;
  }

  // 返回几年前
  const years = Math.floor((now - timestamp) / (month * 12));
  return `${years} 年前`;
}

/**
 * 将时间戳格式为汉子日期
 * @param timestamp 时间戳
 * @param showYear 是否显示年份（默认 true），如果不是今年，就显示年份
 * @return 格式：一月 2025，一月
 */
export function formatChineseDate(
  timestamp: number,
  showYear: boolean = true,
): string {
  const date = new Date(timestamp);
  let month = '';
  switch (date.getMonth()) {
    case 0:
      month = '一月';
      break;
    case 1:
      month = '二月';
      break;
    case 2:
      month = '三月';
      break;
    case 3:
      month = '四月';
      break;
    case 4:
      month = '五月';
      break;
    case 5:
      month = '六月';
      break;
    case 6:
      month = '七月';
      break;
    case 7:
      month = '八月';
      break;
    case 8:
      month = '九月';
      break;
    case 9:
      month = '十月';
      break;
    case 10:
      month = '十一月';
      break;
    case 11:
      month = '十二月';
      break;
  }

  if (showYear && date.getFullYear() !== new Date().getFullYear()) {
    return `${month} ${date.getFullYear()}`;
  }
  return `${month}`;
}
