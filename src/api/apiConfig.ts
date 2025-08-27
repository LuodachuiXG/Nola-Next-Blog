import { BlogInfo } from '@/models/BlogInfo';
import { ApiResponse } from '@/models/response/ApiResponse';
import { ICP } from '@/models/ICP';

const serverUrl = process.env.SERVER_URL;

/**
 * 获取博客信息
 */
export async function apiConfigGetBlogInfo(): Promise<ApiResponse<BlogInfo>> {
  const info = await fetch(`${serverUrl}/api/config/blog`);
  return info.json();
}


/**
 * 获取 ICP 备案信息
 */
export async function apiConfigGetICP(): Promise<ApiResponse<ICP>> {
  const info = await fetch(`${serverUrl}/api/config/icp`);
  return info.json();
}
