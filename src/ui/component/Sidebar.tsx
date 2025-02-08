'use client';
import { BlogInfo } from '@/models/BlogInfo';
import { Tooltip } from '@heroui/tooltip';
import { ThemeSwitcher } from '@/ui/component/ThemeSwitcher';
import ShadowAvatar from '@/ui/component/ShadowAvatar';
import { Menu, menuTargetToString } from '@/models/Menu';
import { Link } from '@heroui/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { ScrollShadow } from '@heroui/scroll-shadow';

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
  autoWidth?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="h-dvh md:w-auto lg:w-72 flex flex-col gap-4 p-4 lg:p-6 shadow-xl dark:shadow-none">
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
              placement="right"
            >
              <p className="font-black text-2xl cursor-default hidden lg:block">
                {blogInfo.title}
              </p>
            </Tooltip>
          </div>
        </div>
      )}

      {/*菜单项列表*/}
      <ScrollShadow hideScrollBar>
        {menuItems && (
          <div className="flex flex-col gap-6 py-6">
            {menuItems.map((menu) => (
              <div
                className="transition-colors no-underline decoration-wavy decoration-primary hover:underline uppercase"
                key={menu.menuItemId}
              >
                <Link
                  href={menu.href ?? ''}
                  className={clsx(
                    'hidden lg:block text-lg hover:text-primary',
                    {
                      'text-primary': pathname === menu.href,
                    },
                  )}
                  color="foreground"
                  target={menuTargetToString(menu.target)}
                >
                  {menu.displayName}
                </Link>
                <Tooltip
                  content={menu.displayName}
                  showArrow={true}
                  placement="right"
                >
                  <Link
                    href={menu.href ?? ''}
                    className={clsx(
                      'lg:hidden text-sm hover:text-primary flex justify-center',
                      {
                        'text-primary': pathname === menu.href,
                      },
                    )}
                    color="foreground"
                    target={menuTargetToString(menu.target)}
                  >
                    {menu.displayName.length >= 2
                      ? menu.displayName.slice(0, 2)
                      : menu.displayName}
                  </Link>
                </Tooltip>
              </div>
            ))}
          </div>
        )}
      </ScrollShadow>

      {/*主题颜色切换按钮*/}
      <div className="w-full flex justify-center items-end flex-grow">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
