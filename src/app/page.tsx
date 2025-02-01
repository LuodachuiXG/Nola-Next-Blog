import { ScrollShadow } from '@heroui/scroll-shadow';
import PostCard from '@/ui/component/PostCard';
import { apiPostGetPosts } from '@/api/apiPost';

// 缓存过期时间（秒）
export const revalidate = 300;

/**
 * 博客文章页面
 * @constructor
 */
export default async function PostPage() {
  // 获取文章列表
  const [postRes] = await Promise.all([apiPostGetPosts(1, 10)]);
  const postList = postRes.data;

  return (
    <div>
      {/*文章列表*/}
      {postList && (
        <ScrollShadow className="h-[calc(100dvh-3.2rem)] md:h-[calc(100dvh-1.5rem)] p-4">
          <div className="grid grid-flow-row-dense gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {postList.data.map((post) => (
              <PostCard key={post.postId} post={post} />
            ))}
          </div>
        </ScrollShadow>
      )}

      {/*暂无文章*/}
      {!postList && <div className="p-4">暂无文章</div>}
    </div>
  );
}
