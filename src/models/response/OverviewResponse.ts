import { Post } from '@/models/Post';
import { Tag } from '@/models/Tag';
import { Category } from '@/models/Category';

/**
 * 博客概览数据接口
 */
export interface OverviewResponse {
  // 文章总浏览量
  postVisitCount: number;
  // 项目数量
  count: {
    // 文章数量
    post: number;
    // 标签数量
    tag: number;
    // 分类数量
    category: number;
    // 评论数量
    comment: number;
    // 日记数量
    diary: number;
    // 友联数量
    link: number;
  };
  // 文章最多的 6 个标签
  tags: Array<Tag>;
  // 文章最多的 6 个分类
  categories: Array<Category>;
  // 浏览量最多的文章
  mostViewedPost: Post | null;
  // 博客创建时间戳毫秒
  createDate: number | null;
}
