import { BlogInfo } from '@/models/BlogInfo';
import { ApiResponse } from '@/models/ApiResponse';

const serverUrl = process.env.SERVER_URL;

/**
 * 获取博客信息
 */
export async function apiConfigGetBlogInfo(): Promise<ApiResponse<BlogInfo>> {
  const info = await fetch(`${serverUrl}/api/config/blog`);
  return info.json();
}
