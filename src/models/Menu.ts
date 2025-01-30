/**
 * 博客菜单接口
 */
export interface Menu {
  // 菜单项 ID
  menuItemId: number;
  // 菜单名
  displayName: string;
  // 地址
  href: string | null;
  // 打开方式
  target: MenuTarget;
  // 父菜单 ID
  parentMenuId: number;
  // 父菜单项 ID
  parentMenuItemId: number | null;
  // 子菜单数组
  children: Array<Menu>;
  // 菜单项排序索引
  index: number;
  // 创建时间戳
  createTime: number;
  // 最后修改时间戳
  lastModifyTime: number | null;
}

/**
 * 博客菜单打开方式枚举类
 */
export enum MenuTarget {
  BLANK = "BLANK",
  SELF = "SELF",
  PARENT = "PARENT",
  TOP = "TOP"
}