import { apiPostGetPostContent } from '@/api/apiPost';
import PostPreview from '@/ui/component/PostPreview';
import { ScrollShadow } from '@heroui/scroll-shadow';

/**
 * 文章页面
 */
export default async function PostPage() {
  const [postContentRes] = await Promise.all([apiPostGetPostContent(15)]);
  const postContent = postContentRes.data;

  // Markdown 文章内容
  const content = postContent?.content ?? '';

  return (
    <>
      <div className="fadeIn-container">
        <ScrollShadow className="flex justify-center pr-6 max-h-[calc(100dvh-55px)] md:max-h-[calc(100dvh-25px)] w-full">
          <article
            id="article"
            className="transition-width max-w-full md:max-w-[70ch] lg:max-w-[80ch] 2xl:max-w-[110ch] pt-6 pl-6 dark:prose-pre:border-1 dark:prose-pre:border-foreground/20 prose md:prose-base dark:prose-invert"
          >
            <PostPreview markdown={content}/>
          </article>
        </ScrollShadow>
      </div>
    </>
  );
}
