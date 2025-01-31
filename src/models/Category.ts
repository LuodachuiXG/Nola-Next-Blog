/**
 * 文章分类接口
 */
export interface Category {
  // 分类 ID
  categoryId: number;
  // 分类名
  displayName: string;
  // 分类别名
  slug: string;
  // 分类封面
  cover: string | null;
  // 是否统一封面（当前分类下的文章封面图都显示为分类的封面图）
  unifiedCover: boolean;
  // 文章数量
  postCount: number;
}