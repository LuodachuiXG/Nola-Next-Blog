import './globals.css';
import { Providers } from './providers';
import Navbar from '@/ui/component/Navbar';
import { apiConfigGetBlogInfo } from '@/api/apiConfig';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import Sidebar from '@/ui/component/Sidebar';
import { apiMenuGetMenuItem } from '@/api/apiMenu';
import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
  maximumScale: 1,
  minimumScale: 1,
};

/**
 * 根据博客信息动态生成 Metadata 数据
 */
export async function generateMetadata() {
  const blogInfoRes = await apiConfigGetBlogInfo();
  const blogInfo = blogInfoRes.data;

  // 博客标题
  const blogTitle = blogInfo
    ? `${blogInfo.title + (blogInfo.subtitle ? ` | ${blogInfo.subtitle}` : '')}`
    : 'Nola Blog';

  return {
    title: {
      template: `%s - ${blogTitle}`,
      default: `首页 - ${blogTitle}`,
    },
    openGraph: {
      images: [blogInfo?.logo ?? ''],
    },
    // 博客图标
    icons: [
      {
        url: blogInfo?.logo ?? '',
        rel: 'icon',
        type: 'image/png',
      },
    ] as Array<Icon>,
  } as Metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 博客信息响应、菜单项响应
  const [blogInfoRes, menuItemRes] = await Promise.all([
    apiConfigGetBlogInfo(),
    apiMenuGetMenuItem(),
  ]);

  // 博客信息
  const blogInfo = blogInfoRes.data;
  // 菜单项
  const menuItems = menuItemRes.data;

  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <Providers>
          <div className="w-dvw h-dvh flex flex-col md:flex-row relative overflow-clip">
            {/*暗色模式时的彩色背景组件*/}
            {/*<BlurColorBackground />*/}
            <aside className="flex-shrink-0 z-10 dark:bg-[#1B1C20]">
              {/*窄屏 NavBar*/}
              <div className="md:hidden border-b-1 dark:border-[#3D3D3F] border-[#E3E8F7]">
                <Navbar blogInfo={blogInfo} menuItems={menuItems} />
              </div>
              {/*宽屏 NavBar*/}
              <div className="hidden md:block border-r-1 dark:border-[#3D3D3F] border-[#E3E8F7]">
                <Sidebar blogInfo={blogInfo} menuItems={menuItems} />
              </div>
            </aside>
            <div className="flex flex-col flex-grow z-10">
              <main className="flex-grow dark:bg-[#18171D] bg-[#F7F9FF]">
                {children}
              </main>
              <footer className="flex-col hidden md:block h-6 text-tiny px-4 text-center text-foreground/40 dark:text-white/70 dark:bg-[#18171D] bg-[#F7F9FF]">
                Powered by
                <a href="https://github.com/LuodachuiXG/Nola" target="_blank">
                  <span className="font-semibold ml-1 italic hover:text-primary transition-colors">
                    Nola
                  </span>
                </a>
              </footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
