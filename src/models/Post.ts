import { Category } from '@/models/Category';
import { Tag } from '@/models/Tag';

/**
 * 文章接口
 */
export interface Post {
  // 文章 ID
  postId: number;
  // 文章标题
  title: string;
  // 文章摘要（如果文章有密码，摘要为 null）
  excerpt: string | null;
  // 文章别名
  slug: string;
  // 文章封面
  cover: string | null;
  // 是否允许评论
  allowComment: boolean;
  // 是否置顶
  pinned: boolean;
  // 文章是否有密码
  encrypted: boolean;
  // 文章访问量
  visit: number;
  // 文章分类（如果文章有密码，分类为 null）
  category: Category | null;
  // 文章标签列表（如果文章有密码，标签为空列表）
  tags: Array<Tag>;
  // 文章创建时间戳
  createTime: number;
  // 文章最后修改时间戳（如果文章有密码，文章最后修改时间戳为 null）
  lastModifyTime: number | null;
}