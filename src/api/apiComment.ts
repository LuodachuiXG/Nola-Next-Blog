import { ApiResponse } from '@/models/ApiResponse';
import { Pager } from '@/models/Pager';
import { Comment } from '@/models/Comment';

const serverUrl = process.env.SERVER_URL;

/**
 * 获取评论
 * @param id 文章 ID（文章 ID 和文章别名至少提供一个，ID 优先级更高）
 * @param slug 文章别名（文章 ID 和文章别名至少提供一个，ID 优先级更高）
 * @param page 当前页（留 0 获取所有评论）
 * @param size 每页条数
 */
export async function apiCommentGetComment(
  id: number | null,
  slug: string | null,
  page: number,
  size: number,
): Promise<ApiResponse<Pager<Comment>>> {
  let url = `${serverUrl}/api/comment?page=${page}&size=${size}`;
  if (id) {
    url += `&id=${id}`;
  } else if (slug) {
    url += `&slug=${slug}`;
  }
  const info = await fetch(url);
  return info.json();
}

/**
 * 添加评论
 * 此接口为 POST 请求，请勿直接在客户端组件中调用，因为拿不到 serverUrl，需要在 action 中使方法在服务端运行
 * @param postId 文章 ID
 * @param displayName 昵称
 * @param email 邮箱
 * @param content 评论内容
 * @param site 站点地址
 * @param parentCommentId 父评论 ID
 * @param replyCommentId 回复评论 ID
 */
export async function apiCommentAddComment(
  postId: number,
  displayName: string,
  email: string,
  content: string,
  site: string | null,
  parentCommentId: number | null,
  replyCommentId: number | null,
): Promise<ApiResponse<Comment>> {
  const url = `${serverUrl}/api/comment`;
  const data = JSON.stringify({
    postId: postId,
    displayName: displayName,
    email: email,
    content: content,
    site: site,
    parentCommentId: parentCommentId,
    replyCommentId: replyCommentId,
  });
  const info = await fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return info.json();
}
