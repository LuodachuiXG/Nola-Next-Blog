import { apiPostGetPostContent } from '@/api/apiPost';
import PostPreview from '@/ui/component/PostPreview';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { stringToNumber } from '@/util/NumberUtil';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { getImageRealUrl } from '@/util/UrlUtil';
import PostInfoHead from '@/ui/component/PostInfoHead';

type Props = {
  id?: string;
  slug?: string;
};

/**
 * 根据文章数据动态生成 Metadata
 * @param props
 */
export async function generateMetadata(props: {
  searchParams?: Promise<Props>;
}) {
  const searchParams = await props.searchParams;
  // 是否传了文章参数（ID 或 Slug）
  const hasParams = searchParams?.id || searchParams?.slug;

  // 没有传参
  if (!hasParams) {
    return {
      title: '文章不存在',
    };
  } else {
    const [postContentRes] = await Promise.all([
      apiPostGetPostContent(
        searchParams?.id ? stringToNumber(searchParams?.id) : undefined,
        searchParams?.slug,
      ),
    ]);

    const post = postContentRes.data;

    if (post) {
      /* 文章存在 */
      // 文章封面
      let cover = '';

      if (post.post.cover) {
        // 文章自己有封面
        cover = post.post.cover;
      } else {
        // 文章自己没封面，查看是否分类封面，以及分类是否设置了统一封面
        if (
          post.post.category &&
          post.post.category.cover &&
          post.post.category.unifiedCover
        ) {
          // 分类有封面，并且设置了统一封面
          cover = post.post.category.cover;
        }
      }

      if (cover.length > 0) {
        /* 有封面 */
        return {
          title: post.post.title,
          openGraph: {
            images: [getImageRealUrl(cover) ?? ''],
          },
          // 网页图标
          icons: [
            {
              url: getImageRealUrl(cover),
              rel: 'icon',
              type: 'image/png',
            },
          ] as Array<Icon>,
        };
      } else {
        /* 没封面 */
        return {
          title: post.post.title,
        };
      }
    } else {
      /* 文章不存在 */
      return {
        title: '文章不存在',
      };
    }
  }
}

/**
 * 文章页面
 * ID 和 slug 至少提供一个
 */
export default async function PostPage(props: {
  searchParams?: Promise<Props>;
}) {
  const searchParams = await props.searchParams;

  // 是否传了文章参数（ID 或 Slug）
  const hasParams = searchParams?.id || searchParams?.slug;

  // 没有传参
  if (!hasParams) return <PostNotExist />;

  const [postContentRes] = await Promise.all([
    apiPostGetPostContent(
      searchParams?.id ? stringToNumber(searchParams?.id) : undefined,
      searchParams?.slug,
    ),
  ]);
  const postContent = postContentRes.data;

  if (!postContent) {
    return Promise.reject('文章不存在');
  }

  // Markdown 文章内容
  const content = postContent?.content ?? '';

  return (
    <>
      <div className="fadeIn-container">
        <ScrollShadow className="pr-6 max-h-[calc(100dvh-55px)] md:max-h-[calc(100dvh-25px)]">
          <div className="flex flex-col items-center">
            <PostInfoHead post={postContent.post} />
            <article
              id="article"
              className="w-dvw md:max-w-[70ch] lg:max-w-[80ch] 2xl:max-w-[110ch] pl-6 dark:prose-pre:border-1 dark:prose-pre:border-foreground/20 prose md:prose-base dark:prose-invert"
            >
              <PostPreview markdown={content} />
            </article>
          </div>
        </ScrollShadow>
      </div>
    </>
  );
}

/**
 * 文章不存在
 * @constructor
 */
function PostNotExist() {
  return (
    <div className="w-full flex justify-center items-center p-6">
      文章不存在
    </div>
  );
}
