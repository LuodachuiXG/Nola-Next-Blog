import { Card, CardFooter } from '@heroui/card';
import { Post } from '@/models/Post';
import { Image } from '@heroui/image';
import { clsx } from 'clsx';
import { getImageRealUrl } from '@/util/UrlUtil';

/**
 * 文章卡片
 * @param post 文章接口
 */
export default function PostCard({ post }: { post: Post }) {

  // 当前文章是否有封面图
  const hasCover = post.cover || (post.category?.cover && post.category.unifiedCover)
  // 封面地址
  const coverUrl = post.cover ? post.cover : (post.category?.cover ? post.category.cover : '')
  return (
    <div className="relative">
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
        className="group transition-all cursor-pointer h-full overflow-hidden hover:-translate-y-0.5"
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
        <CardFooter className={clsx(
          "flex items-start h-full",
          {
            "transition-background bg-gradient-to-r from-black/30 to-transparent hover:bg-black/15": hasCover
          }
        )}>
          <div className="flex flex-col gap-1 p-1 overflow-auto">
            <p
              className={clsx('font-semibold transition-all group-hover:text-primary', {
                // 如果当前文章有封面，则把文字固定为白色，否则看不清
                'text-white': hasCover
              })}
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
        </CardFooter>
      </Card>
    </div>
  );
}
