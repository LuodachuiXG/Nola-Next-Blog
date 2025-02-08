// app/components/ThemeSwitcher.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import { Light, Moon, Screen } from '@ricons/carbon';

type Theme = 'system' | 'light' | 'dark';

/**
 * 主题切换工具
 * @param size 按钮大小 ['md', 'sm']，默认 'sm'
 */
export function ThemeSwitcher({ size }: { size?: 'md' | 'sm' }) {
  const [isClient, setIsClient] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setIsClient(true);

    // 先判断之前是否设置过主题色
    const lastTheme = localStorage.getItem('theme');
    if (lastTheme) {
      // 之前设置过主题色，应用到当前页面
      const asTheme = stringAsTheme(lastTheme);
      document.documentElement.className = asTheme;
      setTheme(asTheme);
    }
  }, []);

  /**
   * 改变主题
   * @param theme
   */
  function changeTheme(theme: Theme) {
    let target: Theme;
    switch (theme) {
      case 'system':
        target = 'light';
        break;
      case 'light':
        target = 'dark';
        break;
      default:
        target = 'system';
        break;
    }

    document.documentElement.className = target;
    localStorage.setItem('theme', target);
    setTheme(target);
  }

  return (
    <div>
      {isClient && (
        <Button
          variant="light"
          radius="full"
          size={size ?? 'sm'}
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
      )}
    </div>
  );
}

/**
 * 将 string 转为 Theme
 * @param str 字符串（'system' | 'dark' | 'light'）
 */
function stringAsTheme(str: string): Theme {
  if (str === 'light') {
    return 'light';
  } else if (str === 'dark') {
    return 'dark';
  } else {
    return 'system';
  }
}
