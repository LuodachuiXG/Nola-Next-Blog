import { BlogInfo } from '@/models/BlogInfo';
import { ApiResponse } from '@/models/ApiResponse';

/**
 * 获取博客信息
 */
export async function apiConfigGetBlogInfo(): Promise<ApiResponse<BlogInfo>> {
  const info = await fetch('https://loac.cc/api/config/blog');
  return info.json();
}
