'use client';
/**
 * 全局错误处理
 * @param error
 * @param reset
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>服务器正在维护中，请稍后再试。</h2>
        <p>错误信息：{error.message}</p>
        <button onClick={() => reset()}>重试</button>
      </body>
    </html>
  );
}
