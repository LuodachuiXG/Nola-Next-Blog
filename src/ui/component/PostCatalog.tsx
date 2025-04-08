'use client';

import { PostHeading } from '@/models/PostHeading';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Minimize as MinimizeIcon,
  Catalog as CatalogIcon,
} from '@ricons/carbon';

/**
 * 文章目录组件
 */
export function PostCatalog({ headings }: { headings: Array<PostHeading> }) {
  // 实时监听当前 client 窗口大小
  const [screenWidth, setScreenWidth] = useState(0);

  // 当前目录中高亮的标题
  const [activeId, setActiveId] = useState<string>('');
  const visibleIds = useRef<Set<string>>(new Set());

  // 取出当前目录标题中最大 level 的标题（数字越小 level 越大）
  const maxLevel = Math.min(...headings.map((heading) => heading.level));

  // 是否显示目录
  const [showCatalog, setShowCatalog] = useState(false);

  const onResize = useCallback(() => {
    setScreenWidth(
      document.documentElement.clientWidth || document.body.clientWidth,
    );
  }, []);

  // 监听窗口小变换
  useEffect(() => {
    setScreenWidth(
      document.documentElement.clientWidth || document.body.clientWidth,
    );
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  // 获取文章中所有标题元素
  const getHeadings = () => {
    const article = document.querySelector('#article');
    return Array.from(
      article?.querySelectorAll('h1, h2, h3, h4, h5, h6') || [],
    ) as HTMLElement[];
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          // 双向更新可见元素集合
          if (entry.isIntersecting) {
            visibleIds.current.add(id);
          } else {
            visibleIds.current.delete(id);
          }
        });

        // 从可见元素中找出最靠近顶部的标题
        const visibleElements = getHeadings().filter((h) =>
          visibleIds.current.has(h.id),
        );
        if (visibleElements.length === 0) return;

        const closest = visibleElements.sort(
          (a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top,
        )[0];

        // 设置当前高亮的目录标题
        setActiveId(closest.id);

        if (closest.id) {
          // 将目录滚动到当前高亮显示的标题
          const target = document.getElementById(
            `${closest.id.trim()}_catalog`,
          );
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      },
    );

    // 开始观察所有标题
    const headings = getHeadings();
    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <motion.div
      className="fixed right-0 z-[30] fadeIn-container"
      initial={{
        top: '3.75rem',
      }}
      animate={{
        top: screenWidth < 768 ? '3.75rem' : '0',
      }}
    >
      <motion.div
        className="m-5 rounded-xl shadow-lx overflow-hidden bg-white dark:bg-[#1B1C20] border-1  border-[#E3E8F7] dark:border-[#3D3D3F]"
        initial={{
          height: '1rem',
          width: '1rem',
        }}
        animate={{
          height: showCatalog ? 'auto' : '1rem',
          width: showCatalog ? 'auto' : '1rem',
          transition: {
            type: 'spring',
            bounce: 0.2,
          },
        }}
      >
        <ScrollShadow
          className="max-h-[calc(65dvh)] p-4 relative max-w-60"
          hideScrollBar
        >
          <div className="text-large text-default-500">目录</div>
          {headings.map((heading, i) => (
            <motion.div
              id={heading.text.trim() + '_catalog'}
              key={i}
              className="line-clamp-1"
              style={{ paddingLeft: `${(heading.level - maxLevel) * 1.5}rem` }}
              initial={{
                lineHeight: '1.95rem',
              }}
              animate={{
                lineHeight: activeId === heading.text ? '3rem' : '1.95rem',
              }}
            >
              <motion.a
                href={`#${heading.text}`}
                className="no-underline"
                initial={{
                  fontWeight: '500',
                }}
                animate={{
                  color:
                    activeId === heading.text
                      ? 'rgb(47, 109, 230)'
                      : 'rgb(113, 113, 121)',
                  fontWeight: activeId === heading.text ? '800' : '500',
                }}
              >
                {heading.text}
              </motion.a>
            </motion.div>
          ))}
        </ScrollShadow>
      </motion.div>
      <motion.div
        className="bg-white dark:bg-[#1B1C20] border-1  border-[#E3E8F7] dark:border-[#3D3D3F] absolute size-8 left-2 bottom-3 select-none cursor-pointer flex items-center justify-center rounded-full"
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.9,
        }}
        animate={{
          rotate: showCatalog ? 360 : 0,
        }}
        onClick={() => setShowCatalog(!showCatalog)}
      >
        {showCatalog ? (
          <MinimizeIcon className="size-4" />
        ) : (
          <CatalogIcon className="size-4" />
        )}
      </motion.div>
    </motion.div>
  );
}
