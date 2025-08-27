import { ApiResponse } from '@/models/response/ApiResponse';
import { Link } from '@/models/Link';
import { Pager } from '@/models/Pager';

const serverUrl = process.env.SERVER_URL;

/**
 * 获取友情链接
 * @param page 当前页（留 0 获取所有链接）
 * @param size 每页条数
 */
export async function apiLinkGetLinks(
  page: number,
  size: number,
): Promise<ApiResponse<Pager<Link>>> {
  const info = await fetch(`${serverUrl}/api/link?page=${page}&size=${size}`);
  return info.json();
}
