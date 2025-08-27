import { ApiResponse } from '@/models/response/ApiResponse';
import { Menu } from '@/models/Menu';

const serverUrl = process.env.SERVER_URL;

/**
 * 获取菜单项
 * @param tree 是否构建树形结构（默认 true）
 */
export async function apiMenuGetMenuItem(
  tree?: boolean
): Promise<ApiResponse<Array<Menu>>> {
  const info = await fetch(`${serverUrl}/api/menu?tree=${tree ?? true}`);
  return info.json();
}
