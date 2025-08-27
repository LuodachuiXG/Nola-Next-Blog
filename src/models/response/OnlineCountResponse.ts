/**
 * 当前博客在线人数响应接口
 */
export interface OnlineCountResponse {
  // 当前博客在线人数
  count: number;
  // 时间戳（毫秒）
  timestamp: number;
}