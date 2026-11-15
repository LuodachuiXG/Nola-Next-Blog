import { ApiResponse } from '@/models/response/ApiResponse';
import { Pager } from '@/models/Pager';
import { Diary } from '@/models/Diary';
import { apiFetch } from '@/api/apiFetch';

/**
 * 获取日记
 * @param page 当前页（留 0 获取所有分类）
 * @param size 每页条数
 */
export async function apiDiaryGetDiary(
  page: number,
  size: number
): Promise<ApiResponse<Pager<Diary>>> {
  return apiFetch<ApiResponse<Pager<Diary>>>(
    `/api/diary?page=${page}&size=${size}`
  );
}
