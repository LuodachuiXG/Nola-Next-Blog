import { Metadata } from 'next';
import { isInPageSizeList, PAGE_SIZE_LIST } from '@/util/ConstData';
import { redirect } from 'next/navigation';
import { stringToNumber } from '@/util/NumberUtil';
import ErrorContainer from '@/ui/component/ErrorContainer';
import { ScrollShadow } from '@heroui/scroll-shadow';
import PaginationContainer from '@/ui/component/PaginationContainer';
import { apiDiaryGetDiary } from '@/api/apiDiary';
import DiaryCard from '@/ui/component/DiaryCard';

export const metadata: Metadata = {
  title: '日记',
};

export const revalidate = 0;

export default async function DiaryPage(props: {
  searchParams?: Promise<{
    page?: string;
    size?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  if (searchParams?.size && !isInPageSizeList(searchParams?.size)) {
    // 当前传进来的是非法页码（不在 PAGE_SIZE_LIST 中）
    // 默认 40 条每页
    redirect(
      `/diary?page=${stringToNumber(searchParams?.page, 1)}&size=${PAGE_SIZE_LIST[2]}`,
    );
  }

  const [diaryRes] = await Promise.all([
    apiDiaryGetDiary(
      stringToNumber(searchParams?.page, 1),
      stringToNumber(searchParams?.size, 40),
    ),
  ]);

  if (diaryRes.errMsg) {
    return <ErrorContainer msg={diaryRes.errMsg} />;
  }

  const dairyList = diaryRes.data;
  // 日记总数
  const totalData = dairyList?.totalData ?? 0;

  return (
    <div className="flex flex-col h-full relative">
      <div className="pt-6 pr-1 flex-grow">
        <div className="text-3xl font-semibold text-gray-600 select-none dark:text-white pl-6">
          <p>{totalData > 0 ? `& ${totalData} 个日记` : '暂无日记'}</p>
        </div>
        <div className="flex-grow">
          {dairyList?.data ? (
            <ScrollShadow className="p-4 max-h-[calc(100dvh-170px)] md:max-h-[calc(100dvh-140px)]">
              <div className="flex gap-4 flex-wrap relative">
                {dairyList.data.map((diary) => (
                  <DiaryCard diary={diary} key={diary.diaryId} />
                ))}
              </div>
            </ScrollShadow>
          ) : null}
        </div>
      </div>

      {/*分页组件*/}
      {dairyList && (
        <div className="flex justify-center py-2">
          <PaginationContainer pager={dairyList} route="/diary" />
        </div>
      )}
    </div>
  );
}
