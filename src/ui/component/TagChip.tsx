import { Tag } from '@/models/Tag';
import { Chip } from '@heroui/chip';
import { clsx } from 'clsx';
import { Tooltip } from '@heroui/tooltip';

/**
 * 标签 Chip
 * @param tag 标签
 */
export default function TagChip({ tag }: { tag: Tag }) {
  return (
    <Tooltip
      content={<TagPostCountTooltip postCount={tag.postCount} />}
      showArrow
    >
      <Chip
        className={clsx(
          'relative cursor-pointer transition-all hover:-translate-y-0.5 fadeIn-container',
          { 'pl-2.5': tag.color },
        )}
        variant="flat"
        key={tag.tagId}
        startContent={tag.color ? TagColorDot(tag.color) : null}
      >
        {tag.displayName}
      </Chip>
    </Tooltip>
  );
}

/**
 * 卡片颜色点
 * @param color
 * @constructor
 */
function TagColorDot(color: string) {
  return (
    <div className="size-2 rounded-full" style={{ background: color }}></div>
  );
}

/**
 * 标签文章数量 Tooltip
 * @param postCount 文章数量
 */
function TagPostCountTooltip({ postCount }: { postCount: number }) {
  return (
    <div>
      {postCount > 0 ? (
        <span>
          有 <span className="text-primary">{postCount}</span>{' '}
          个文章使用了该标签
        </span>
      ) : (
        <span>没有文章使用该标签</span>
      )}
    </div>
  );
}
