'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * 全局异常处理
 * @param error
 * @param reset
 * @constructor
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error digest: ', error);
  }, [error]);
  // global-error 替换整棵文档树，不经过 RootLayout，没有 globals.css 和主题类，
  // 所以这里必须全部使用内联样式，不能依赖 Tailwind 类
  return (
    <html lang="zh" suppressHydrationWarning>
      <body
        style={{
          margin: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#18171D',
          color: '#ffffff',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '3rem',
              width: '16rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p style={{ fontSize: '2rem', fontWeight: 700, margin: 0, zIndex: 1 }}>
              ERROR
            </p>
            <div
              style={{
                position: 'absolute',
                width: '16rem',
                height: '3rem',
                background: '#ef4444',
                top: 0,
                left: 0,
              }}
            />
          </div>
          <p style={{ margin: 0 }}>服务器正在维护中，请稍后再试</p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={reset}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              重试
            </button>
            <Link
              href="/"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                background: 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              返回首页
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
