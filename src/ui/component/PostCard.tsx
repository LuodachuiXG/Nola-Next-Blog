import { Card, CardFooter } from '@heroui/card';
import { Post } from '@/models/Post';
import { Image } from '@heroui/image';
import { clsx } from 'clsx';

/**
 * 文章卡片
 * @param post 文章接口
 */
export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="relative">
      {/*如果当前文章显示了封面，则在文章卡片周围以封面图为底图，做发光效果*/}
      {(post.cover || (post.category?.cover && post.category.unifiedCover)) && (
        <Image
          removeWrapper
          alt={post.title}
          className="z-0 w-full h-full absolute opacity-50 blur backdrop-blur"
          src={
            post.cover
              ? post.cover
              : post.category?.cover
                ? post.category.cover
                : ''
          }
        />
      )}

      <Card
        className="transition-all cursor-pointer hover:text-primary"
        isBlurred
        shadow="sm"
        isHoverable
        isFooterBlurred
      >
        {/*是否显示文章封面*/}
        {(post.cover ||
          (post.category?.cover && post.category.unifiedCover)) && (
          <Image
            removeWrapper
            alt={post.title}
            className="z-0 w-full h-full object-cover absolute"
            src={
              post.cover
                ? post.cover
                : post.category?.cover
                  ? post.category.cover
                  : ''
            }
          />
        )}
        <CardFooter className="h-full flex items-start">
          <div className="flex flex-col gap-1 p-1 overflow-auto">
            <p
              className={clsx('font-semibold transition-all', {
                // 如果当前文章有封面，则把文字固定为白色，否则看不清
                'text-white':
                  post.cover ||
                  (post.category?.cover && post.category.unifiedCover),
              })}
            >
              {post.title}
            </p>
            <p
              className={clsx(
                'font-normal text-sm text-foreground/70 line-clamp-2 md:line-clamp-3',
                {
                  // 如果当前文章有封面，则把文字固定为白色，否则看不清
                  'text-white/70':
                    post.cover ||
                    (post.category?.cover && post.category.unifiedCover),
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
