import { ApiResponse } from '@/models/response/ApiResponse';
import { OverviewResponse } from '@/models/response/OverviewResponse';
import { apiFetch } from '@/api/apiFetch';

/**
 * 获取博客概览数据
 */
export async function apiOverviewGetOverview(): Promise<
  ApiResponse<OverviewResponse>
> {
  return apiFetch<ApiResponse<OverviewResponse>>('/api/overview');
}
