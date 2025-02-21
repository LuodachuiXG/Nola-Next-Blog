import { apiPostGetPostContent } from '@/api/apiPost';
import PostPreview from '@/ui/component/PostPreview';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { stringToNumber } from '@/util/NumberUtil';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { getImageRealUrl } from '@/util/UrlUtil';
import PostInfoHead from '@/ui/component/PostInfoHead';
import AddCommentContainer from '@/ui/component/AddCommentContainer';
import { apiCommentGetComment } from '@/api/apiComment';
import { Comment } from '@/models/Comment';
import { Pager } from '@/models/Pager';
import { formatDate } from '@/util/DateUtil';
import PaginationContainer from '@/ui/component/PaginationContainer';
import { Post } from '@/models/Post';
import { isInPageSizeList } from '@/util/ConstData';
import { redirect } from 'next/navigation';

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

  if (!postContent) {
    return Promise.reject('文章不存在');
  }

  // Markdown 文章内容
  const content = postContent?.content ?? '';

  return (
    <>
      <div className="fadeIn-container">
        <ScrollShadow className="max-h-[calc(100dvh-55px)] md:max-h-[calc(100dvh-25px)]">
          <div className="flex flex-col items-center overflow-hidden w-dvw md:w-auto">
            {/*文章信息头*/}
            <PostInfoHead post={postContent.post} />
            {/*文章*/}
            <article
              id="article"
              className="w-dvw md:max-w-[70ch] lg:max-w-[80ch] 2xl:max-w-[110ch] px-5 dark:prose-pre:border-1 dark:prose-pre:border-foreground/20 prose md:prose-base dark:prose-invert"
            >
              <PostPreview className="" markdown={content} />
            </article>

            {/*添加评论组件*/}
            {postContent && postContent.post.allowComment && (
              <AddCommentContainer post={postContent.post} />
            )}

            {/*评论列表*/}
            <CommentList commentList={comments} post={postContent.post} />
          </div>
        </ScrollShadow>
      </div>
    </>
  );
}

/**
 * 评论列表
 * @param commentList 评论列表数据
 * @param post 文章接口
 */
function CommentList({
  commentList,
  post,
}: {
  commentList: Pager<Comment> | null;
  post: Post;
}) {

  // 判断用户是否手动输入了错误的页码，在分页组件中已经有了类似判断
  // 这里再加一次是因为下面的页码组件只有在有数据的时候才会调用，所有分页组件中的判断无法触发，所以这里再加一次
  if (!commentList || commentList.data.length <= 0 && commentList.page > 1) {
    // 评论列表为空，并且当前评论页码大于 1，可能是用户在地址栏输入了错误的页码，跳转到第一页
    redirect(`/post?slug=${post.slug}`)
  }

  /**
   * 暂无评论
   */
  function NoComment() {
    return <div className="py-24 text-lg w-full text-center">暂无评论</div>;
  }

  return (
    <div
      id="comment-container"
      className="w-dvw md:max-w-[70ch] lg:max-w-[80ch] 2xl:max-w-[110ch] px-5 my-6"
    >
      {!commentList || commentList.data.length <= 0 ? (
        <NoComment />
      ) : (
        <div className="w-full flex flex-col gap-6">
          {commentList.data.map((comment) => (
            <CommentItem comment={comment} key={comment.commentId} />
          ))}

          <PaginationContainer
            pager={commentList}
            route={`/post?slug=${post.slug}`}
          />
        </div>
      )}
    </div>
  );
}

/**
 * 评论项
 * @param comment 评论接口
 */
function CommentItem({ comment }: { comment: Comment }) {
  /**
   * 评论头像
   */
  function Avatar({ c }: { c: Comment }) {
    return (
      <a href={c.site ?? ''} target="_blank">
        <div className="bg-primary size-10 rounded-full flex justify-center items-center text-white shadow-lg select-none">
          {c.displayName.at(0)}
        </div>
      </a>
    );
  }

  return (
    <div className="w-full flex gap-2 items-start rounded-xl p-2 hover:shadow-lg transition-all border-1 border-transparent hover:border-divider hover:-translate-y-0.5">
      {/*左侧头像*/}
      <Avatar c={comment} />
      {/*右侧评论内容及信息*/}
      <div className="flex-grow flex flex-col">
        {/*昵称和时间*/}
        <div className="flex justify-between items-center">
          <a href={comment.site ?? ''} target="_blank">
            <p id={`comment_${comment.commentId}`} className="text-sm">
              {comment.displayName}
            </p>
          </a>
          <p className="text-sm text-default-500">
            {formatDate(stringToNumber(comment.createTime), true)}
          </p>
        </div>

        {/*评论内容*/}
        <div className="w-full text-base text-foreground break-all">
          {comment.content}
        </div>
      </div>
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
