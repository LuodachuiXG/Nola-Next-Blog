import { Post } from '@/models/Post';
import { Image } from '@heroui/image';
import { getImageRealUrl } from '@/util/UrlUtil';
import ClickLink from '@/ui/component/ClickLink';
import { formatDate } from '@/util/DateUtil';

/**
 * 文章信息头组件
 * @param post 文章
 */
export default function PostInfoHead({ post }: { post: Post }) {
  // 文章封面
  let cover: string | null = null;
  if (post.cover) {
    /* 文章有封面 */
    cover = post.cover;
  } else if (post) {
    /* 文章没封面，检查分类是否有封面并统一封面 */
    if (post.category && post.category.cover && post.category.unifiedCover) {
      /* 分类有封面并且统一封面 */
      cover = post.category.cover;
    }
  }

  return (
    <div className="md:w-[70ch] lg:w-[80ch] 2xl:w-[110ch] mt-3 px-6">
      <div className="h-fit relative flex flex-col gap-4">
        {/*封面，如果有*/}
        {cover && (
          <Image
            className="object-cover shadow-lg"
            radius="sm"
            src={getImageRealUrl(cover)}
            alt={post.title}
            isBlurred
          />
        )}

        {/*文章信息*/}
        <div className="flex flex-col gap-4">
          {/*文章标题*/}
          <p className="text-2xl font-semibold">{post.title}</p>

          {/*文章分类和标签*/}
          {(post.category || post.tags.length > 0) && (
            <div className="flex gap-2">
              {post.category && (
                <ClickLink
                  displayName={'&' + post.category.displayName}
                  href=""
                />
              )}

              {post.tags.length > 0 && (
                <>
                  {post.tags.map((tag) => (
                    <ClickLink
                      displayName={'#' + tag.displayName}
                      href=""
                      key={tag.tagId}
                    />
                  ))}
                </>
              )}
            </div>
          )}

          {/*其他文章信息*/}
          <div className="flex gap-2 text-tiny text-default-500 h-fit items-center">
            {/*是否允许评论*/}
            <p>{post.allowComment ? '允许评论' : '禁止评论'}</p>
            <VerticalDivider />

            {/*是否置顶*/}
            {post.pinned && (
              <>
                <p>置顶</p>
                <VerticalDivider />
              </>
            )}

            {/*发布时间或修改时间*/}
            <p>
              {formatDate(
                post.lastModifyTime ? post.lastModifyTime : post.createTime,
                true,
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 垂直分割线
 */
function VerticalDivider() {
  return <div className="w-divider h-3 bg-divider"></div>;
}
