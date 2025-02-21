import { Link } from '@heroui/link';
import { clsx } from 'clsx';

/**
 * 可点击的 Link
 * @param displayName 显示名1
 * @param href 链接
 * @param showOnCard 当前标签是否显示在图片卡片上（在图片上的话颜色会有变化，防止看不清文字）
 */
export default function ClickLink({
  displayName,
  href,
  showOnImgCard,
}: {
  displayName: string;
  href: string;
  showOnImgCard?: boolean;
}) {
  return (
    <Link
      className={clsx(
        'cursor-pointer hover:text-primary transition-colors text-tiny font-semibold',
        {
          'text-default-500': !showOnImgCard,
          'text-white': showOnImgCard,
        },
      )}
      href={href}
    >
      {displayName}
    </Link>
  );
}
