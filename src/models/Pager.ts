/**
 * 分页接口
 */
export interface Pager<T> {
  // 当前页
  page: number;
  // 每页条数
  size: number;
  // 数据列表
  data: Array<T>;
  // 数据总数量
  totalData: number;
  // 总页数
  totalPages: number;
}