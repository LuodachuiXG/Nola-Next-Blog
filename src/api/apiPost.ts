import { ApiResponse } from '@/models/response/ApiResponse';
import { Pager } from '@/models/Pager';
import { Post } from '@/models/Post';
import { PostContent } from '@/models/PostContent';
import { apiFetch } from '@/api/apiFetch';

/**
 * 获取所有文章
 * @param page 当前页（留 0 获取所有文章）
 * @param size 每页条数
 * @param key 关键字（标题、别名、摘要、内容）
 * @param tagId 标签 ID
 * @param categoryId 分类 ID
 * @param tag 标签名或标签别名
 * @param category 分类名或分类别名
 */
export async function apiPostGetPosts(
  page: number,
  size: number,
  key?: string | null,
  tagId?: number | null,
  categoryId?: number | null,
  tag?: string | null,
  category?: string | null,
): Promise<ApiResponse<Pager<Post>>> {
  let path = `/api/post?page=${page}&size=${size}`;
  if (key) path += `&key=${encodeURIComponent(key)}`;
  if (tagId) path += `&tagId=${tagId}`;
  if (categoryId) path += `&categoryId=${categoryId}`;
  if (tag) path += `&tag=${encodeURIComponent(tag)}`;
  if (category) path += `&category=${encodeURIComponent(category)}`;
  return apiFetch<ApiResponse<Pager<Post>>>(path);
}

/**
 * 根据文章 ID 获取文章
 * @param postId 文章 ID
 */
export async function apiPostGetPostById(
  postId: number
): Promise<ApiResponse<Post>> {
  return apiFetch<ApiResponse<Post>>(`/api/post/${postId}`);
}

/**
 * 根据文章别名获取文章
 * @param slug 文章别名
 */
export async function apiPostGetPostBySlug(
  slug: string
): Promise<ApiResponse<Post>> {
  return apiFetch<ApiResponse<Post>>(`/api/post/slug/${slug}`);
}

/**
 * 获取文章内容
 * @param id 文章 ID（文章 ID 和文章别名至少提供一个）
 * @param slug 文章别名（文章 ID 和文章别名至少提供一个）
 * @param password 文章密码（如果有）
 */
export async function apiPostGetPostContent(
  id?: number,
  slug?: string,
  password?: string
): Promise<ApiResponse<PostContent>> {
  if (!id && !slug) {
    throw new Error('文章 ID 和文章别名至少提供一个');
  }

  let path = `/api/post/content`
  if (id) {
    path += `?id=${id}`
  } else {
    path += `?slug=${encodeURIComponent(slug!)}`
  }

  if (password) {
    path += `&password=${encodeURIComponent(password)}`
  }

  return apiFetch<ApiResponse<PostContent>>(path);
}
