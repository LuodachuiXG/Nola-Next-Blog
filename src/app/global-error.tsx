'use client';

import ErrorContainer from '@/ui/component/ErrorContainer';
import { useEffect } from 'react';

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
  }, []);
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="w-dvw h-dvh items-center justify-center">
          <ErrorContainer msg="服务器正在维护中，请稍后再试" onReset={reset} />
        </div>
      </body>
    </html>
  );
}
