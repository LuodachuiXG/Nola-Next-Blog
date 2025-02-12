import { marked, Tokens } from 'marked';

/**
 * Markdown 文章内容预览组件
 * @param className
 * @param markdown
 */
export default async function PostPreview({
  className,
  markdown,
}: {
  className?: string | undefined;
  markdown: string;
}) {
  marked.use({ renderer: markedRenderer() });

  // 将 Markdown 转为 HTML
  const md = await marked.parse(markdown);

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: md }}></div>
  );
}


/**
 * 重写 marked 处理 handing 标题的逻辑（给标题加上 ID）
 */
function markedRenderer() {
  return {
    heading({ tokens, depth }: Tokens.Heading): string {
      const realLevel = depth;
      const token = tokens[0];
      if (token) {
        const text = 'text' in token ? token.text : '';
        return `<h${realLevel} id="${text}">${text}</h${realLevel}>`;
      } else {
        return '';
      }
    },
  }
}