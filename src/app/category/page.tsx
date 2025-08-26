import { Metadata } from 'next';
import { apiCategoryGetCategory } from '@/api/apiCategory';
import PaginationContainer from '@/ui/component/PaginationContainer';
import { isInPageSizeList, PAGE_SIZE_LIST } from '@/util/ConstData';
import { redirect } from 'next/navigation';
import { stringToNumber } from '@/util/NumberUtil';
import CategoryCard from '@/ui/component/CategoryCard';
import { ScrollShadow } from '@heroui/scroll-shadow';
import ErrorContainer from '@/ui/component/ErrorContainer';

export const metadata: Metadata = {
  title: '分类',
};

export const revalidate = 0;

/**
 * 分类页面
 * @constructor
 */
export default async function CategoryPage(props: {
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
      `/category?page=${stringToNumber(searchParams?.page, 1)}&size=${PAGE_SIZE_LIST[2]}`,
    );
  }

  const [categoryRes] = await Promise.all([
    apiCategoryGetCategory(
      stringToNumber(searchParams?.page, 1),
      stringToNumber(searchParams?.size, 40),
    ),
  ]);

  if (categoryRes.errMsg) {
    return <ErrorContainer msg={categoryRes.errMsg} />
  }

  const categoryList = categoryRes.data;
  // 分类总数
  const totalData = categoryList?.totalData ?? 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="pt-6 pl-6 pr-1 text-3xl font-semibold text-gray-600 select-none dark:text-white">
          <p>{totalData > 0 ? `& ${totalData} 个分类` : '暂无分类'}</p>
        </div>
        <div className="flex-grow">
          {categoryList?.data ? (
            <ScrollShadow className="p-4 max-h-[calc(100dvh-170px)] md:max-h-[calc(100dvh-140px)]">
              <div className="flex gap-4 flex-wrap">
                {categoryList.data.map((category) => (
                  <CategoryCard category={category} key={category.categoryId} />
                ))}
              </div>
            </ScrollShadow>
          ) : null}
        </div>
      </div>

      {/*分页组件*/}
      {categoryList && (
        <div className="flex justify-center py-2">
          <PaginationContainer pager={categoryList} route="/category" />
        </div>
      )}
    </div>
  );
}
