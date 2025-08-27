'use client';
import { BlogInfo } from '@/models/BlogInfo';
import { Tooltip } from '@heroui/tooltip';
import { ThemeSwitcher } from '@/ui/component/ThemeSwitcher';
import ShadowAvatar from '@/ui/component/ShadowAvatar';
import { Menu as MenuIcon } from '@ricons/carbon';
import { Button } from '@heroui/button';
import { Drawer, DrawerContent } from '@heroui/drawer';
import { Menu, MenuTarget } from '@/models/Menu';
import { clsx } from 'clsx';
import { redirect, usePathname } from 'next/navigation';
import { useDisclosure } from '@heroui/react';
import { Link } from '@heroui/link';

/**
 * Navbar 在窄屏显示在顶部
 * @param blogInfo 博客信息
 * @param menuItems 菜单项
 */
export default function Navbar({
  blogInfo,
  menuItems,
}: {
  blogInfo: BlogInfo | null;
  menuItems: Array<Menu> | null;
}) {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  /**
   * 抽屉侧边栏
   */
  function DrawerContainer() {
    return (
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="left"
        size="xs"
      >
        <DrawerContent>
          {(onClose) => (
            <div className="flex flex-col gap-4 p-6">
              {menuItems &&
                menuItems.map((menu) => (
                  <div
                    className="transition-colors no-underline decoration-wavy decoration-primary hover:underline uppercase"
                    key={menu.menuItemId}
                  >
                    <p
                      onClick={() => {
                        onClose();
                        if (menu.href) {
                          if (menu.target === MenuTarget.BLANK) {
                            window.open(menu.href);
                          } else {
                            redirect(menu.href);
                          }
                        }
                      }}
                      className={clsx(
                        'text-lg hover:text-primary cursor-pointer text-black',
                        {
                          'text-primary': pathname === menu.href,
                        },
                      )}
                    >
                      {menu.displayName}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <div className="fixed top-0 left-0 h-14 w-dvw bg-background/90 dark:bg-background/75 backdrop-blur-2xl flex items-center px-4">
      {menuItems && menuItems.length > 0 && (
        <div>
          <DrawerContainer />
          <div className="mr-3">
            <Button
              isIconOnly
              aria-label="菜单"
              variant="light"
              onPress={onOpen}
            >
              <MenuIcon className="size-6" />
            </Button>
          </div>
        </div>
      )}
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
              <p className="text-foreground">
                {
                  blogInfo.title +
                  (blogInfo.subtitle ? ` | ${blogInfo.subtitle}` : '')
                }
              </p>
            }
            showArrow={true}
          >
            <Link
              className="text-lg text-foreground cursor-pointer"
              href="/"
            >
              <p>{blogInfo.title}</p>
            </Link>
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
