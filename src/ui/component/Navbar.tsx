import { BlogInfo } from '@/models/BlogInfo';
import { Tooltip } from '@heroui/tooltip';
import { ThemeSwitcher } from '@/ui/component/ThemeSwitcher';
import ShadowAvatar from '@/ui/component/ShadowAvatar';

/**
 * Navbar 在窄屏显示在顶部
 * @param blogInfo 博客信息
 */
export default function Navbar({ blogInfo }: { blogInfo: BlogInfo | null }) {
  return (
    <div className="h-14 w-full flex items-center px-4 shadow-lg dark:shadow-none">
      {blogInfo && (
        <div className="flex items-center gap-3">
          {/*Favicon*/}
          {blogInfo.favicon && (
            <ShadowAvatar
              src={blogInfo.favicon}
              alt={blogInfo.title}
              size="sm"
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
