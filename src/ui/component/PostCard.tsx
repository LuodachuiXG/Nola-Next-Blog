import { Card, CardFooter } from '@heroui/card';
import { Post } from '@/models/Post';
import { Image } from '@heroui/image';
import { clsx } from 'clsx';
import { getImageRealUrl } from '@/util/UrlUtil';
import { formatDate } from '@/util/DateUtil';
import { Tooltip } from '@heroui/tooltip';
import { Link } from '@heroui/link';

/**
 * 文章卡片
 * @param post 文章接口
 */
export default function PostCard({ post }: { post: Post }) {
  // 当前文章是否有封面图
  const hasCover =
    !!post.cover || (!!post.category?.cover && post.category.unifiedCover);
  // 封面地址
  const coverUrl = post.cover
    ? post.cover
    : post.category?.cover
      ? post.category.cover
      : '';

  // 文章标签内容
  const tagContent =
    post.tags.length === 0 ? null : post.tags.length === 1 ? (
      // 只有一个标签
      <ClickLink
        displayName={'#' + post.tags[0].displayName}
        href="/"
        showOnImgCard={hasCover}
      />
    ) : (
      // 有多个标签
      <Tooltip
        delay={500}
        showArrow
        content={
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <ClickLink
                displayName={'#' + tag.displayName}
                href="/?page=2&size=10"
                key={tag.tagId}
              />
            ))}
          </div>
        }
      >
        <p className="cursor-default line-clamp-1">
          #{post.tags[0].displayName} 等 {post.tags.length} 个标签
        </p>
      </Tooltip>
    );

  return (
    <div className="relative fadeIn-container">
      {/*如果当前文章显示了封面，则在文章卡片周围以封面图为底图，做发光效果*/}
      {hasCover && (
        <Image
          removeWrapper
          alt={post.title}
          className="z-0 w-full h-full absolute opacity-50 blur backdrop-blur-sm"
          src={coverUrl ? getImageRealUrl(coverUrl) : ''}
        />
      )}

      <Card
        className="transition-all h-full overflow-hidden hover:-translate-y-0.5"
        isBlurred
        shadow="sm"
        isHoverable
        isFooterBlurred
      >
        {/*是否显示文章封面*/}
        {hasCover && (
          <Image
            removeWrapper
            alt={post.title}
            className="z-0 w-[101%] h-full object-cover absolute"
            src={coverUrl ? getImageRealUrl(coverUrl) : ''}
          />
        )}
        <CardFooter
          className={clsx('flex items-start h-full', {
            'transition-background bg-gradient-to-r from-black/30 to-transparent hover:bg-black/15':
              hasCover,
          })}
        >
          <div className="flex flex-col gap-1 p-1 overflow-auto w-full justify-between h-full">
            {/*文章标题摘要*/}
            <div className="cursor-pointer group">
              <p
                className={clsx(
                  'font-semibold transition-all group-hover:text-primary',
                  {
                    // 如果当前文章有封面，则把文字固定为白色，否则看不清
                    'text-white': hasCover,
                  },
                )}
              >
                {post.title}
              </p>
              <p
                className={clsx(
                  'font-normal text-sm text-foreground/70 line-clamp-2 md:line-clamp-3 xl:line-clamp-4',
                  {
                    // 如果当前文章有封面，则把文字固定为白色，否则看不清
                    'text-white/70': hasCover,
                  },
                )}
              >
                {post.excerpt}
              </p>
            </div>

            {/*文章时间、分类、标签等信息*/}
            <div className="flex gap-1 justify-between w-full text-tiny mt-1 overflow-hidden">
              {/*分类标签*/}
              <div
                className={clsx(
                  'flex gap-2 font-semibold overflow-ellipsis line-clamp-1',
                  {
                    'text-default-500': !hasCover,
                    'text-white': hasCover,
                  },
                )}
              >
                {/*分类*/}
                {post.category && (
                  <ClickLink
                    displayName={'&' + post.category.displayName}
                    href="/"
                    showOnImgCard={hasCover}
                  />
                )}

                {/*标签*/}
                {tagContent}
              </div>

              {/*时间*/}
              <div
                className={clsx('cursor-default', {
                  'text-default-500': !hasCover,
                  'text-white/70': hasCover,
                })}
              >
                {formatDate(
                  post.lastModifyTime ? post.lastModifyTime : post.createTime,
                )}
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

/**
 * 可点击的 Link
 * @param displayName 显示名1
 * @param href 链接
 * @param showOnCard 当前标签是否显示在图片卡片上（在图片上的话颜色会有变化，防止看不清文字）
 */
function ClickLink({
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
