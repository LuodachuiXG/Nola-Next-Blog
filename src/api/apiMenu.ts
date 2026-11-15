import { ApiResponse } from '@/models/response/ApiResponse';
import { Menu } from '@/models/Menu';
import { apiFetch } from '@/api/apiFetch';

/**
 * 获取菜单项
 * @param tree 是否构建树形结构（默认 true）
 */
export async function apiMenuGetMenuItem(
  tree?: boolean
): Promise<ApiResponse<Array<Menu>>> {
  return apiFetch<ApiResponse<Array<Menu>>>(`/api/menu?tree=${tree ?? true}`);
}
