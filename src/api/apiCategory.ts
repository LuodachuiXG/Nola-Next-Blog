import { ApiResponse } from '@/models/ApiResponse';
import { Pager } from '@/models/Pager';
import { Category } from '@/models/Category';

const serverUrl = process.env.SERVER_URL;

/**
 * 获取分类
 * @param page 当前页（留 0 获取所有文章）
 * @param size 每页条数
 */
export async function apiCategoryGetCategory(
  page: number,
  size: number
): Promise<ApiResponse<Pager<Category>>> {
  const url = `${serverUrl}/api/category?page=${page}&size=${size}`;
  const info = await fetch(url);
  return info.json();
}
