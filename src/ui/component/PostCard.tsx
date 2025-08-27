'use client';

import { Post } from '@/models/Post';
import { Tooltip } from '@heroui/tooltip';
import NextLink from 'next/link';
import ClickLink from '@/ui/component/ClickLink';
import { PinFilled as PinnedIcon } from '@ricons/carbon';
import TimeFormatLabel from '@/ui/component/TimeFormatLabel';
import { Image } from '@heroui/react';

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
      <div className="group min-h-40 h-40 max-h-40 flex gap-2 overflow-clip rounded-lg transition-all active:ring-2 shadow-small bg-background dark:bg-content2">
        {hasCover && (
          <div className="h-40 w-56 xl:w-64 brightness-95 group-hover:brightness-100 transition-all overflow-clip">
            <NextLink href={`/post?slug=${post.slug}`}>
              <Image
                src={coverUrl}
                alt={post.title}
                className="!h-40 !object-cover group-hover:scale-110"
                radius="none"
                isBlurred
              />
            </NextLink>
          </div>
        )}
        <div className="flex flex-col gap-1 p-4 overflow-auto w-full justify-between h-full">
          {/*文章标题摘要*/}
          <NextLink href={`/post?slug=${post.slug}`}>
            <div className="cursor-pointer group flex flex-col gap-1">
              <p className="font-semibold transition-colors group-hover:text-primary line-clamp-1">
                {post.title}
              </p>
              <p className="font-normal text-sm text-foreground/70 line-clamp-2 md:line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </NextLink>

          {/*文章时间、分类、标签等信息*/}
          <div className="flex gap-1 justify-between w-full text-tiny mt-1 overflow-hidden">
            {/*分类标签*/}
            <div className="flex gap-2 font-semibold overflow-ellipsis line-clamp-1 text-default-500">
              {/*分类*/}
              {post.category && (
                <ClickLink
                  displayName={'&' + post.category.displayName}
                  href={`/?category=${post.category.displayName}`}
                />
              )}

              {/*标签*/}
              {tagContent}
            </div>

            {/*时间*/}
            <div className="cursor-default text-default-500">
              <TimeFormatLabel time={post.createTime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
