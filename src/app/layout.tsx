import './globals.css';
import { Providers } from './providers';
import Navbar from '@/ui/component/Navbar';
import { apiConfigGetBlogInfo } from '@/api/apiConfig';
import { Metadata } from 'next';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import Sidebar from '@/ui/component/Sidebar';
import BlurColorBackground from '@/ui/component/BlurColorBackground';
import { apiMenuGetMenuItem } from '@/api/apiMenu';

export let metadata: Metadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 博客信息响应、菜单项响应
  const [blogInfoRes, menuItemRes] = await Promise.all([
    apiConfigGetBlogInfo(),
    apiMenuGetMenuItem()
  ]);

  // 博客信息
  const blogInfo = blogInfoRes.data;
  // 菜单项
  const menuItems = menuItemRes.data;


  metadata = {
    title: blogInfo
      ? `${blogInfo.title + (blogInfo.subtitle ? ` | ${blogInfo.subtitle}` : '')}`
      : 'Nola Blog',
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
  };

  return (
    <html lang="zh">
      <body className="antialiased bg-background text-foreground">
        <Providers>
          <div className="w-dvw h-dvh flex flex-col md:flex-row relative overflow-clip">

            {/*暗色模式时的彩色背景组件*/}
            <BlurColorBackground />

            <aside className="flex-shrink-0 z-10">
              {/*窄屏 NavBar*/}
              <div className="md:hidden">
                <Navbar blogInfo={blogInfo} />
              </div>
              {/*宽屏 NavBar*/}
              <div className="hidden md:block">
                <Sidebar blogInfo={blogInfo} menuItems={menuItems}/>
              </div>
            </aside>
            <div className="flex flex-col flex-grow z-10">
              <main className="flex-grow">{children}</main>
              <footer className="hidden md:block">footer</footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
