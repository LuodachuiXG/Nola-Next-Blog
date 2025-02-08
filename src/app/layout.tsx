import './globals.css';
import { Providers } from './providers';
import Navbar from '@/ui/component/Navbar';
import { apiConfigGetBlogInfo } from '@/api/apiConfig';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import Sidebar from '@/ui/component/Sidebar';
import BlurColorBackground from '@/ui/component/BlurColorBackground';
import { apiMenuGetMenuItem } from '@/api/apiMenu';
import AlertModal from '@/ui/component/AlertModal';

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
  };
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
    <html lang="zh" className="dark">
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
                <Sidebar blogInfo={blogInfo} menuItems={menuItems} />
              </div>
            </aside>
            <div className="flex flex-col flex-grow z-10">
              <AlertModal
                title="正在开发中"
                content={
                  <>
                    <p>新版博客 UI 目前仍在开发中，仅完成部分功能。</p>
                    <br />
                    <p>2025 年 2 月 8 日 </p>
                  </>
                }
              />
              <main className="flex-grow">{children}</main>
              <footer className="hidden md:block h-6">footer</footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
