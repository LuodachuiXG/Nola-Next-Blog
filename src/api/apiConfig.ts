import { BlogInfo } from '@/models/BlogInfo';
import { ApiResponse } from '@/models/response/ApiResponse';
import { ICP } from '@/models/ICP';
import { apiFetch } from '@/api/apiFetch';

/**
 * 获取博客信息
 */
export async function apiConfigGetBlogInfo(): Promise<ApiResponse<BlogInfo>> {
  return apiFetch<ApiResponse<BlogInfo>>('/api/config/blog');
}


/**
 * 获取 ICP 备案信息
 */
export async function apiConfigGetICP(): Promise<ApiResponse<ICP>> {
  return apiFetch<ApiResponse<ICP>>('/api/config/icp');
}
