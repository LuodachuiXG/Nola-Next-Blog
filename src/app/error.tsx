'use client';

import { useEffect } from 'react';
import ErrorContainer from '@/ui/component/ErrorContainer';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error digest: ', error);
  }, [error]);

  return (
    <ErrorContainer msg="服务端错误" />
  );
}
