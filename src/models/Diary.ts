/**
 * 日记接口
 */
export interface Diary {
  // 日记 ID
  diaryId: number;
  // 日记内容
  content: string;
  // 日记 HTML
  html: string;
  // 创建时间戳
  createTime: number;
  // 最后修改时间
  lastModifyTime: number | null;
}
