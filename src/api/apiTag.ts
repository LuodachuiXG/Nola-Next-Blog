import { ApiResponse } from '@/models/response/ApiResponse';
import { Tag } from '@/models/Tag';
import { Pager } from '@/models/Pager';
import { apiFetch } from '@/api/apiFetch';

/**
 * 获取标签
 * @param page 当前页（留 0 获取所有标签）
 * @param size 每页条数
 */
export async function apiTagGetTag(
  page: number,
  size: number
): Promise<ApiResponse<Pager<Tag>>> {
  return apiFetch<ApiResponse<Pager<Tag>>>(`/api/tag?page=${page}&size=${size}`);
}
