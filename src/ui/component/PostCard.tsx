import { Card, CardFooter } from '@heroui/card';
import { Post } from '@/models/Post';
import { Image } from '@heroui/image';
import { clsx } from 'clsx';
import { getImageRealUrl } from '@/util/UrlUtil';
import { Tooltip } from '@heroui/tooltip';
import NextLink from 'next/link';
import ClickLink from '@/ui/component/ClickLink';
import { PinFilled as PinnedIcon } from '@ricons/carbon';
import TimeFormatLabel from '@/ui/component/TimeFormatLabel';

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
        href={`/?tag=${post.tags[0].displayName}`}
        showOnImgCard={hasCover}
      />
    ) : (
      // 有多个标签
      <Tooltip
        delay={300}
        showArrow
        content={
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <ClickLink
                displayName={'#' + tag.displayName}
                href={`/?tag=${tag.displayName}`}
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
    <div className="relative scaleIn-container">
      {/*文章置顶时显示图钉图标*/}
      {post.pinned && (
        <div className="absolute -top-2 -left-2 p-1.5 z-50 bg-red-500 rounded-full shadow-red-500">
          <PinnedIcon className="w-3 h-3 text-white" />
        </div>
      )}

      <Card
        className="group h-full overflow-clip rounded-xl transition-all hover:-translate-y-0.5 shadow-small"
        isHoverable
      >
        {/*是否显示文章封面*/}
        {hasCover && (
          <Image
            removeWrapper
            alt={post.title}
            className="z-0 w-[101%] h-full object-cover absolute group-hover:scale-125 group-hover:rotate-2"
            src={coverUrl ? getImageRealUrl(coverUrl) : ''}
          />
        )}
        <CardFooter
          className={clsx('flex items-start h-full z-10', {
            'bg-black/30 group-hover:bg-black/20 transition-background': hasCover,
          })}
        >
          <div className="flex flex-col gap-1 p-1 overflow-auto w-full justify-between h-full">
            {/*文章标题摘要*/}
            <NextLink href={`/post?slug=${post.slug}`}>
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
            </NextLink>

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
                    href={`/?category=${post.category.displayName}`}
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
                <TimeFormatLabel
                  time={
                    post.lastModifyTime ? post.lastModifyTime : post.createTime
                  }
                />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
