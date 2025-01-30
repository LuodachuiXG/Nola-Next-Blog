import { BlogInfo } from '@/models/BlogInfo';
import { Tooltip } from '@heroui/tooltip';
import { ThemeSwitcher } from '@/ui/component/ThemeSwitcher';
import ShadowAvatar from '@/ui/component/ShadowAvatar';
import { Menu } from '@/models/Menu';

/**
 * 宽屏显示在左侧的侧边栏
 * @param blogInfo 博客信息
 * @param menuItems 菜单项
 */
export default function Sidebar({
  blogInfo,
  menuItems,
}: {
  blogInfo: BlogInfo | null;
  menuItems: Array<Menu> | null;
}) {
  return (
    <div className="h-dvh transition-all md:w-auto lg:w-72 flex flex-col gap-4 p-4 lg:p-6 shadow-xl dark:shadow-none ">
      {blogInfo && (
        <div>
          {/*头像和标题*/}
          <div className="flex gap-4 items-center">
            {/*Favicon*/}
            {blogInfo.favicon && (
              <ShadowAvatar src={blogInfo.favicon} alt={blogInfo.title} />
            )}

            {/*博客标题*/}
            <Tooltip
              content={
                blogInfo.title +
                (blogInfo.subtitle ? ` | ${blogInfo.subtitle}` : '')
              }
              showArrow={true}
            >
              <p className="font-black text-2xl cursor-default hidden lg:block">
                {blogInfo.title}
              </p>
            </Tooltip>
          </div>
        </div>
      )}

      {/*菜单项列表*/}
      {menuItems && (
        <div className="flex flex-col gap-6 py-6">
          {menuItems.map((menu) => (
            <div
              className="transition-colors text-xl no-underline decoration-wavy cursor-default select-none font-semibold hover:text-primary hover:underline uppercase"
              key={menu.menuItemId}
            >
              {menu.displayName}
            </div>
          ))}
        </div>
      )}

      {/*主题颜色切换按钮*/}
      <div className="w-full flex justify-center items-end flex-grow">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
