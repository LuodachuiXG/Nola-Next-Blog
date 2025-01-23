// app/components/ThemeSwitcher.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import { Light, Moon, Screen } from '@ricons/carbon';

/**
 * 主题切换工具
 * @constructor
 */
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  /**
   * 切换主题
   * @param current 当前主题
   */
  function changeTheme(current: string | undefined) {
    if (current === 'system') {
      setTheme('light');
    } else if (current == 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  }

  return (
    <div>
      <Button
        variant="ghost"
        radius="full"
        size="sm"
        isIconOnly
        onPress={() => changeTheme(theme)}
      >
        {theme === 'light' ? (
          <Light className="size-4" />
        ) : theme === 'dark' ? (
          <Moon className="size-4" />
        ) : (
          <Screen className="size-4" />
        )}
      </Button>
    </div>
  );
}
