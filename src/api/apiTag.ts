import { ApiResponse } from '@/models/ApiResponse';
import { Tag } from '@/models/Tag';
import { Pager } from '@/models/Pager';

const serverUrl = process.env.SERVER_URL;

/**
 * 获取标签
 * @param page 当前页（留 0 获取所有文章）
 * @param size 每页条数
 */
export async function apiTagGetTag(
  page: number,
  size: number
): Promise<ApiResponse<Pager<Tag>>> {
  const url = `${serverUrl}/api/tag?page=${page}&size=${size}`;
  const info = await fetch(url);
  return info.json();
}
