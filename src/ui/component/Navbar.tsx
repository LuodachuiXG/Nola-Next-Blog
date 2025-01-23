import { BlogInfo } from '@/models/BlogInfo';
import { Avatar } from '@heroui/avatar';
import { Tooltip } from '@heroui/tooltip';
import { ThemeSwitcher } from '@/ui/component/ThemeSwitcher';

/**
 * Navbar 在窄屏显示在顶部
 * @param blogInfo 博客信息
 */
export default function Navbar({ blogInfo }: { blogInfo: BlogInfo | null }) {
  return (
    <div className="size-full flex items-center px-4">
      {blogInfo && (
        <div className="flex items-center gap-3">

          {/*Favicon*/}
          {blogInfo.favicon && (
            <Avatar
              src={blogInfo.favicon}
              size="sm"
              isBordered
              alt={blogInfo.title}
            />
          )}

          {/*博客标题*/}
          <Tooltip
            content={
              blogInfo.title +
              (blogInfo.subtitle ? ` | ${blogInfo.subtitle}` : '')
            }
            showArrow={true}
          >
            <p className="font-black text-xl cursor-default">
              {blogInfo.title}
            </p>
          </Tooltip>
        </div>
      )}

      {/*主题颜色切换按钮*/}
      <div className="flex flex-grow justify-end">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
