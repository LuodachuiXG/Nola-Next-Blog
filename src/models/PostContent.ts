import { Post } from '@/models/Post';

/**
 * 文章内容接口
 */
export interface PostContent {
  // 文章接口
  post: Post;
  // 文章内容
  content: string;
}