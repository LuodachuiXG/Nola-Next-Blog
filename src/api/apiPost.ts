import { ApiResponse } from '@/models/ApiResponse';
import { Pager } from '@/models/Pager';
import { Post } from '@/models/Post';

const serverUrl = process.env.SERVER_URL;

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
  let url = `${serverUrl}/api/post?page=${page}&size=${size}`;
  if (key) url += `&key=${key}`;
  if (tagId) url += `&tagId=${tagId}`;
  if (categoryId) url += `&categoryId=${categoryId}`;
  if (tag) url += `&tag=${tag}`;
  if (category) url += `&category=${category}`;
  const info = await fetch(url);
  return info.json();
}

/**
 * 根据文章 ID 获取文章
 * @param postId 文章 ID
 */
export async function apiPostGetPostById(
  postId: number
): Promise<ApiResponse<Post>> {
  const info = await fetch(`${serverUrl}/api/post/${postId}`);
  return info.json();
}

/**
 * 根据文章别名获取文章
 * @param slug 文章别名
 */
export async function apiPostGetPostBySlug(
  slug: string
): Promise<ApiResponse<Post>> {
  const info = await fetch(`${serverUrl}/api/post/slug/${slug}`);
  return info.json();
}

