'use server';

import { apiCommentAddComment } from '@/api/apiComment';
import { ApiResponse } from '@/models/ApiResponse';
import { Comment } from '@/models/Comment';

/**
 * 添加评论表单 Action 动作
 * @param postId 文章 ID
 * @param preState 上一个请求的响应
 * @param formData 表单数据
 */
export async function commentActionAddComment(
  postId: number,
  preState: ApiResponse<Comment>,
  formData: FormData,
): Promise<ApiResponse<Comment>> {
  const displayName = formData.get('displayName');
  const email = formData.get('email');
  const site = formData.get('site');
  const content = formData.get('content');

  if (!displayName || !email || !content) {
    return {
      code: 405,
      errMsg: '请将内容填写完整',
      data: null
    };
  }

  return await apiCommentAddComment(
    postId,
    displayName.toString(),
    email.toString(),
    content.toString(),
    !site || site.toString().length <= 0 ? null : site.toString(),
    null,
    null,
  );
}
