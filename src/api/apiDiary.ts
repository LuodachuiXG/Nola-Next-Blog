import { ApiResponse } from '@/models/ApiResponse';
import { Pager } from '@/models/Pager';
import { Diary } from '@/models/Diary';

const serverUrl = process.env.SERVER_URL;

/**
 * 获取日记
 * @param page 当前页（留 0 获取所有分类）
 * @param size 每页条数
 */
export async function apiDiaryGetDiary(
  page: number,
  size: number
): Promise<ApiResponse<Pager<Diary>>> {
  const url = `${serverUrl}/api/diary?page=${page}&size=${size}`;
  const info = await fetch(url);
  return info.json();
}
