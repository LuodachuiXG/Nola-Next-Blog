import PostCodeHighlight from './PostCodeHighlight';
import PostPreview from './PostPreview';

/**
 * 文章正文展示组件
 * 服务端渲染的文章页面与加密文章解锁后的客户端渲染共用，保证正文展示完全一致
 * @param content Markdown 正文
 */
export default function PostContentView({ content }: { content: string }) {
  return (
    <article
      id="article"
      className="max-w-full md:max-w-[70ch] lg:max-w-[80ch] 2xl:max-w-[110ch] px-5 0 prose md:prose-base dark:prose-invert prose-pre:bg-transparent prose-pre:text-sm md:prose-pre:text-lg prose-code:font-['JetBrains_Mono'] prose-pre:p-0 prose-pre:m-0 prose-pre:mb-5"
    >
      <PostCodeHighlight />
      <PostPreview markdown={content} />
    </article>
  );
}
