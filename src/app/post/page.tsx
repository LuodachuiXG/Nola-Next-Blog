import {
  apiPostGetPostById,
  apiPostGetPostBySlug,
  apiPostGetPostContent,
} from '@/api/apiPost';
import PostPreview from '@/ui/component/PostPreview';
import { stringToNumber } from '@/util/NumberUtil';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { getImageRealUrl } from '@/util/UrlUtil';
import PostInfoHead from '@/ui/component/PostInfoHead';
import CommentContainer from '@/ui/component/CommentContainer';
import { apiCommentGetComment } from '@/api/apiComment';
import { Post } from '@/models/Post';
import { isInPageSizeList } from '@/util/ConstData';
import { redirect } from 'next/navigation';
import { ApiResponse } from '@/models/ApiResponse';
import { clsx } from 'clsx';
import ErrorContainer from '@/ui/component/ErrorContainer';
import PostCodeHighlight from '@/ui/component/PostCodeHighlight';

type Props = {
  // 文章 ID
  id?: string;
  // 文章别名
  slug?: string;
  // 评论页码
  page?: string;
  // 评论每页大小
  size?: string;
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
  const hasPostParams = searchParams?.id || searchParams?.slug;

  // 没有传参
  if (!hasPostParams) {
    return {
      title: '文章不存在',
    };
  } else {
    let postContentRes = {} as ApiResponse<Post>;

    if (searchParams.id) {
      const [res] = await Promise.all([
        apiPostGetPostById(stringToNumber(searchParams.id)),
      ]);
      postContentRes = res;
    } else if (searchParams.slug) {
      const [res] = await Promise.all([
        apiPostGetPostBySlug(searchParams.slug),
      ]);
      postContentRes = res;
    }

    const post = postContentRes.data;

    if (post) {
      /* 文章存在 */
      // 文章封面
      let cover = '';

      if (post.cover) {
        // 文章自己有封面
        cover = post.cover;
      } else {
        // 文章自己没封面，查看是否分类封面，以及分类是否设置了统一封面
        if (
          post.category &&
          post.category.cover &&
          post.category.unifiedCover
        ) {
          // 分类有封面，并且设置了统一封面
          cover = post.category.cover;
        }
      }

      if (cover.length > 0) {
        /* 有封面 */
        return {
          title: post.title,
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
          title: post.title,
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

  const page = stringToNumber(searchParams?.page, 1);
  const size = stringToNumber(searchParams?.size, 40);

  // 是否传了文章参数（ID 或 Slug）
  const hasPostParams = searchParams?.id || searchParams?.slug;

  // 没有传文章参数
  if (!hasPostParams) return <PostNotExist />;

  if (searchParams?.size && !isInPageSizeList(searchParams?.size)) {
    // 当前传进来的是非法页码（不在 PAGE_SIZE_LIST 中）
    // 使用默认页码
    if (searchParams?.id) {
      redirect(`/post?id=${searchParams.id}`);
    } else if (searchParams?.slug) {
      redirect(`/post?slug=${searchParams.slug}`);
    } else {
      redirect(`/`);
    }
  }

  const [postContentRes, commentRes] = await Promise.all([
    apiPostGetPostContent(
      searchParams?.id ? stringToNumber(searchParams?.id) : undefined,
      searchParams?.slug,
    ),

    apiCommentGetComment(
      searchParams?.id ? stringToNumber(searchParams?.id) : null,
      searchParams?.slug ?? null,
      page,
      size,
    ),
  ]);

  const postContent = postContentRes.data;

  const comments = commentRes.data;

  // Markdown 文章内容
  const content = postContent?.content ?? '';

  if (postContentRes.errMsg || !postContent) {
    return <ErrorContainer msg={postContentRes.errMsg ?? '未知错误'} />;
  }

  return (
    <>
      <div className="fadeIn-container flex justify-center">
        <div className="w-full overflow-x-hidden">
          <div className="flex flex-col items-center overflow-hidden w-dvw md:w-auto relative">
            <div className="w-dvw md:max-w-[70ch] lg:max-w-[80ch] 2xl:max-w-[110ch] my-0 md:my-5 rounded-none md:rounded-xl bg-white dark:bg-[#1B1C20] md:border-1 border-[#E3E8F7] dark:border-[#3D3D3F] shadow-lg">
              {/*文章信息头*/}
              <PostInfoHead post={postContent.post} />
              {/*文章*/}
              <article
                id="article"
                className="max-w-full md:max-w-[70ch] lg:max-w-[80ch] 2xl:max-w-[110ch] px-5 0 prose md:prose-base dark:prose-invert prose-pre:bg-transparent prose-pre:text-sm md:prose-pre:text-lg prose-code:font-['JetBrains_Mono'] prose-pre:p-0 prose-pre:m-0 prose-pre:mb-5"
              >
                <PostCodeHighlight />
                <PostPreview markdown={content} />
              </article>

              <PostDivider />

              {/*评论组件*/}
              <CommentContainer
                post={postContent.post}
                commentList={comments}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * 分割线（水平）
 * @param className
 * @param hasMargin 是否有默认的边距（默认有 true）
 */
function PostDivider({
  className,
  hasMargin,
}: {
  className?: string;
  hasMargin?: boolean;
}) {
  return (
    <div
      className={clsx(className, 'w-full flex flex-col items-center gap-4', {
        'my-16 px-5': hasMargin ?? true,
      })}
    >
      {/*线*/}
      <div className="w-full h-divider bg-divider"></div>
    </div>
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
