import { ScrollShadow } from '@heroui/scroll-shadow';
import PostCard from '@/ui/component/PostCard';
import { apiPostGetPosts } from '@/api/apiPost';
import PaginationContainer from '@/ui/component/PaginationContainer';
import { stringToNumber } from '@/util/NumberUtil';
import { isInPageSizeList, PAGE_SIZE_LIST } from '@/util/ConstData';
import { redirect } from 'next/navigation';
import ErrorContainer from '@/ui/component/ErrorContainer';

// 文章缓存过期时间（秒）
export const revalidate = 0;

/**
 * 博客文章页面
 * @constructor
 */
export default async function PostPage(props: {
  searchParams?: Promise<{
    page?: string;
    size?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const page = stringToNumber(searchParams?.page, 1);
  const size = stringToNumber(searchParams?.size, 40);

  if (searchParams?.size && !isInPageSizeList(searchParams?.size)) {
    // 当前传进来的是非法页码（不在 PAGE_SIZE_LIST 中）
    // 使用默认第一个页码
    redirect(`/?page=${page}&size=${PAGE_SIZE_LIST[2]}`);
  }

  // 获取文章列表
  const [postRes] = await Promise.all([apiPostGetPosts(page, size)]);

  if (postRes.errMsg) {
    return <ErrorContainer msg={postRes.errMsg} />
  }

  const postList = postRes.data;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        {/* 文章列表 */}
        {postList && (
          <ScrollShadow className="p-4 max-h-[calc(100dvh-115px)] md:max-h-[calc(100dvh-80px)]">
            <div className="grid grid-flow-row-dense gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {postList.data.map((post) => (
                <PostCard key={post.postId} post={post} />
              ))}
            </div>
          </ScrollShadow>
        )}
        {/*暂无文章*/}
        {!postList && <div className="p-4">暂无文章</div>}
      </div>

      {/*分页组件*/}
      {postList && (
        <div className="flex justify-center py-2">
          <PaginationContainer pager={postList} route="/" />
        </div>
      )}
    </div>
  );
}
