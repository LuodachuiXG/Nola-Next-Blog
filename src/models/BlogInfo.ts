/**
 * 博客信息接口
 */
export interface BlogInfo {
  // 站点标题
  title: string;
  // 站点副标题
  subtitle: string | null;
  // 博主名
  blogger: string | null;
  // LOGO 地址
  logo: string | null;
  // Favicon 地址
  favicon: string | null;
  // 博客创建日期（时间戳毫秒）
  createDate: number;
}