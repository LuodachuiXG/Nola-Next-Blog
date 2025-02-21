'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { DataError as ErrorIcon } from '@ricons/carbon';
import { Button } from '@heroui/button';
import { redirect } from 'next/navigation';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="size-full flex justify-center items-center flex-col gap-4">
      <ErrorIcon className="size-14 mb-4" />
      <p className="font-semibold">
        {typeof error === 'object' ? error.message : error}
      </p>
      <Button
        className="bg-default/30 shadow-lg"
        size="sm"
        onPress={() => {
          redirect('/');
        }}
      >
        返回首页
      </Button>
    </div>
  );
}
