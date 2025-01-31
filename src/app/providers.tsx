'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';
import { useRouter } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <HeroUIProvider navigate={router.push}>
      {/* 用于控制暗色亮色主题（默认跟随系统）*/}
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
      >
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
