import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Navbar from '@/ui/component/Navbar';
import { apiConfigGetBlogInfo } from '@/api/apiConfig';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 博客信息
  const [blogInfo] = await Promise.all([apiConfigGetBlogInfo()]);

  return (
    <html lang="zh" className="dark">
      <body className="antialiased bg-background text-foreground">
        <Providers>
          <div className="w-dvw h-dvh flex flex-col md:flex-row">
            <aside className="h-14 w-full md:h-full md:w-28 lg:w-80 flex-shrink-0">
              {/*窄屏 NavBar*/}
              <div className="size-full md:hidden">
                <Navbar blogInfo={blogInfo.data} />
              </div>
            </aside>
            <div className="flex flex-col flex-grow">
              <main className="bg-green-500 flex-grow">{children}</main>
              <footer className="bg-yellow-500 hidden md:block">footer</footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
