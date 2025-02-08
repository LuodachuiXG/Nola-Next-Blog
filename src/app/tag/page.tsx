import { Metadata } from 'next';
import { apiTagGetTag } from '@/api/apiTag';
import TagChip from '@/ui/component/TagChip';
import PaginationContainer from '@/ui/component/PaginationContainer';
import { stringToNumber } from '@/util/NumberUtil';
import { isInPageSizeList, PAGE_SIZE_LIST } from '@/util/ConstData';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '标签',
};

export const revalidate = 0;

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

  if (searchParams?.size && !isInPageSizeList(searchParams?.size)) {
    // 当前传进来的是非法页码（不在 PAGE_SIZE_LIST 中）
    // 使用默认第一个页码
    redirect(
      `/tag?page=${stringToNumber(searchParams?.page, 1)}&size=${PAGE_SIZE_LIST[0]}`,
    );
  }

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
    <div className="pt-6 pl-6 pb-6 pr-1 flex flex-col gap-4 h-full">
      <div className="text-3xl font-semibold text-gray-600 select-none dark:text-white ">
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
