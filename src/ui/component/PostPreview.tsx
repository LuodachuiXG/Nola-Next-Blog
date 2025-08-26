import { marked, Tokens } from 'marked';
import { PostHeading } from '@/models/PostHeading';
import { PostCatalog } from '@/ui/component/PostCatalog';

/**
 * Markdown 文章内容预览组件
 * @param className
 * @param markdown
 * @param onHeadings 回调当前文章的标题和层级信息
 */
export default async function PostPreview({
  className,
  markdown,
  onHeadings,
}: {
  className?: string | undefined;
  markdown: string;
  onHeadings?: (headings: Array<PostHeading>) => void;
}) {
  // 存储文章标题
  const headings: Array<PostHeading> = [];

  marked.use({
    renderer: markedRenderer((heading: PostHeading) => {
      headings.push(heading);
    }),
  });

  // 将 Markdown 转为 HTML
  const md = await marked.parse(markdown);

  onHeadings?.(headings);

  return (
    <div className={className}>
      <div dangerouslySetInnerHTML={{ __html: md }}></div>
      {/*目录*/}
      <div>
        <PostCatalog headings={headings} />
      </div>
    </div>
  );
}

/**
 * 重写 marked 处理 handing 标题的逻辑（给标题加上 ID）
 */
function markedRenderer(onFindHeading: (heading: PostHeading) => void) {
  return {
    heading({ tokens, depth }: Tokens.Heading): string {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const text: string = this.parser.parseInline(tokens);
      onFindHeading({
        text: text.trim(),
        level: depth,
      });

      return `<h${depth} id="${text.trim()}">
                <a href="#${text.trim()}" class="no-underline">${text}</a>
              </h${depth}>`;
    },
    // 自定义 table 渲染逻辑
    table({ header, rows }: Tokens.Table): string {
      let headerRow = '';
      if (header.length > 0) {
        const headerCells = header
          .map((cell) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const content = this.parser.parseInline(cell.tokens);
            return `<th${cell.align ? ` style="text-align:${cell.align}"` : ''}>${content}</th>`;
          })
          .join('');
        headerRow = `<thead><tr>${headerCells}</tr></thead>`;
      }

      const bodyRows = rows
        .map((row) => {
          const cells = row
            .map((cell) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              const content = this.parser.parseInline(cell.tokens);
              return `<td${cell.align ? ` style="text-align:${cell.align}"` : ''}>${content}</td>`;
            })
            .join('');
          return `<tr>${cells}</tr>`;
        })
        .join('');

      const tableContent = `<table>${headerRow}<tbody>${bodyRows}</tbody></table>`;

      // 用 div 包装表格，添加必要的 CSS 类
      return `<div class="overflow-x-auto px-2 border-1 border-dashed border-gray-200 dark:border-gray-600">${tableContent}</div>`;
    },
  };
}
