/**
 * 评论接口
 */
export interface Comment {
  // 评论 ID
  commentId: number;
  // 文章 ID
  postId: number;
  // 父评论 ID
  parentCommentId: number | null;
  // 回复评论 ID
  replayCommentId: number | null;
  // 回复评论名称
  replayDisplayName: string | null;
  // 评论内容
  content: string;
  // 站点地址
  site: string | null;
  // 名称
  displayName: string;
  // 邮箱
  email: string;
  // 创建时间戳
  createTime: string;
  // 是否通过审核
  isPass: boolean;
  // 子评论数组
  children: Array<Comment> | null;
}