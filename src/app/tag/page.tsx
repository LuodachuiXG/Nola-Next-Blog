import { Metadata } from 'next';
import { apiTagGetTag } from '@/api/apiTag';
import TagChip from '@/ui/component/TagChip';
import PaginationContainer from '@/ui/component/PaginationContainer';
import { stringToNumber } from '@/util/NumberUtil';
import { isInPageSizeList, PAGE_SIZE_LIST } from '@/util/ConstData';
import { redirect } from 'next/navigation';
import { ScrollShadow } from '@heroui/scroll-shadow';

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
    redirect(
      `/tag?page=${stringToNumber(searchParams?.page, 1)}&size=${PAGE_SIZE_LIST[2]}`,
    );
  }

  const [tagRes] = await Promise.all([
    apiTagGetTag(
      stringToNumber(searchParams?.page, 1),
      stringToNumber(searchParams?.size, 40),
    ),
  ]);
  const tagList = tagRes.data;
  // 标签总数
  const totalData = tagList?.totalData ?? 0;

  return (
    <div className="flex flex-col h-full">
      <div className="pt-6 pl-6 pr-1 flex-grow">
        <div className="text-3xl font-semibold text-gray-600 select-none dark:text-white">
          <p>{totalData > 0 ? `# ${totalData} 个标签` : '暂无标签'}</p>
        </div>
        <div className="flex-grow">
          {tagList?.data ? (
            <ScrollShadow className="p-4 max-h-[calc(100dvh-170px)] md:max-h-[calc(100dvh-140px)]">
              <div className="flex gap-4 flex-wrap">
                {tagList.data.length > 0 ? (
                  tagList.data.map((tag) => (
                    <TagChip tag={tag} key={tag.tagId} />
                  ))
                ) : (
                  <div>暂无标签</div>
                )}
              </div>
            </ScrollShadow>
          ) : null}
        </div>
      </div>

      {/*分页组件*/}
      {tagList && (
        <div className="flex justify-center py-2">
          <PaginationContainer pager={tagList} route="/tag" />
        </div>
      )}
    </div>
  );
}
