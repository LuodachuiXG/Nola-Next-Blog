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
          <div className="w-dvw h-dvh flex flex-col md:flex-row overflow-clip relative">
            {/*暗色模式时的彩色背景组件*/}
            {/*<BlurColorBackground />*/}
            <aside className="flex-shrink-0 z-10">
              {/*窄屏 NavBar*/}
              <div className="md:hidden bg-background/90 dark:bg-background/75 backdrop-blur-2xl">
                <Navbar blogInfo={blogInfo} menuItems={menuItems} />
              </div>
              {/*宽屏 NavBar*/}
              <div className="hidden md:block border-r-1 dark:bg-[#1B1C20] dark:border-[#3D3D3F] border-[#E3E8F7]">
                <Sidebar blogInfo={blogInfo} menuItems={menuItems} />
              </div>
            </aside>
            <div className="absolute w-full h-full md:w-[calc(100dvw-4rem)] lg:w-[calc(100dvw-18rem)] left-0 md:left-16 lg:left-72 top-0 pt-14 md:pt-0 flex flex-col flex-grow z-0 overflow-y-auto scroll-smooth dark:bg-[#18171D] bg-[#F7F9FF]">
              <main className="flex-grow">
                {children}
              </main>
              <footer>
                <div className="p-4 h-12 flex items-center text-foreground/40 dark:text-white/70 text-tiny">
                  Powered by
                  <a href="https://github.com/LuodachuiXG/Nola" target="_blank">
                    <span className="font-semibold ml-1 italic hover:text-primary transition-colors">
                      Nola
                    </span>
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
