/**
 * API 响应体接口
 */
export interface ApiResponse<T> {
  // 响应码
  code: number;
  // 错误信息
  errMsg: string | null;
  // 数据
  data: T | null;
}
