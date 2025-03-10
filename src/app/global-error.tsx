'use client';
/**
 * 全局错误处理
 */
export default function GlobalError() {
  return (
    <html>
      <body>
        <div className="w-dvw h-dvh flex flex-col gap-2 items-center p-6 justify-center">
          <h2>服务器正在维护中，请稍后再试。</h2>
        </div>
      </body>
    </html>
  );
}
