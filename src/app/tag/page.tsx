import { Metadata } from 'next';
import { apiTagGetTag } from '@/api/apiTag';
import TagChip from '@/ui/component/TagChip';
import PaginationContainer from '@/ui/component/PaginationContainer';
import { stringToNumber } from '@/util/NumberUtil';

export const metadata: Metadata = {
  title: '标签',
};

export const revalidate = 60;

/**
 * 标签页面
 * @constructor
 */
export default async function TagPage(props: {
  searchParams?: Promise<{
    page?: string;
    size?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const [tagRes] = await Promise.all([
    apiTagGetTag(
      stringToNumber(searchParams?.page, 1),
      stringToNumber(searchParams?.size, 10),
    ),
  ]);
  const tagList = tagRes.data;
  // 标签总数
  const totalData = tagList?.totalData ?? 0;

  return (
    <div className="p-6 flex flex-col gap-4 h-full">
      <div className="text-3xl font-semibold text-primary select-none dark:text-white ">
        <p>{totalData > 0 ? `# ${totalData} 个标签` : '暂无标签'}</p>
      </div>
      <div className="flex-grow">
        {tagList?.data ? (
          <div className="flex gap-4 flex-wrap">
            {tagList.data.length > 0 ? (
              tagList.data.map((tag) => <TagChip tag={tag} key={tag.tagId} />)
            ) : (
              <div>暂无标签</div>
            )}
          </div>
        ) : null}
      </div>

      {/*分页组件*/}
      {tagList && (
        <div className="flex justify-center">
          <PaginationContainer pager={tagList} route="/tag" />
        </div>
      )}
    </div>
  );
}
