import { Tag } from '@/models/Tag';
import { Chip } from '@heroui/chip';
import { clsx } from 'clsx';
import { Link } from '@heroui/link';

/**
 * 标签 Chip
 * @param tag 标签
 */
export default function TagChip({ tag }: { tag: Tag }) {
  return (
    <div className="transition-transform hover:-translate-y-0.5">
      <Chip
        className={clsx(
          'relative cursor-pointer scaleIn-container shadow-small bg-white dark:dark:bg-[#1B1C20]',
          { 'pl-2.5': tag.color },
        )}
        key={tag.tagId}
        startContent={tag.color ? TagColorDot(tag.color) : null}
      >
        <Link
          href={`/?tag=${tag.displayName}`}
          className="text-foreground text-sm"
        >
          {tag.displayName}
        </Link>
      </Chip>
    </div>
  );
}

/**
 * 卡片颜色点
 * @param color
 */
function TagColorDot(color: string) {
  return (
    <div className="size-2 rounded-full" style={{ background: color }}></div>
  );
}
