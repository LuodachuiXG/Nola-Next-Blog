'use client';
/**
 * 全局错误处理
 * @param error
 * @param reset
 */
export default function GlobalError({
  error,
}: {
  error?: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="w-dvw h-dvh flex flex-col gap-2 items-center p-6 justify-center">
          <h2>服务器正在维护中，请稍后再试。</h2>
          <p>错误信息：{JSON.stringify(error ?? '未知错误')}</p>
        </div>
      </body>
    </html>
  );
}
