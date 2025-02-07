/**
 * 友情链接接口
 */
export interface Link {
  // 链接名称
  displayName: string;
  // 链接地址
  url: string;
  // LOGO 地址
  logo: string | null;
  // 描述
  description: string | null;
}
