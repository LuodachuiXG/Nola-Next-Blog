import { ApiResponse } from '@/models/response/ApiResponse';
import { OverviewResponse } from '@/models/response/OverviewResponse';

const serverUrl = process.env.SERVER_URL;

/**
 * 获取博客概览数据
 */
export async function apiOverviewGetOverview(): Promise<
  ApiResponse<OverviewResponse>
> {
  const info = await fetch(`${serverUrl}/api/overview`);
  return info.json();
}
