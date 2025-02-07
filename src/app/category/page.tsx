import { Metadata } from 'next';
import { apiCategoryGetCategory } from '@/api/apiCategory';
import PaginationContainer from '@/ui/component/PaginationContainer';
import { isInPageSizeList, PAGE_SIZE_LIST } from '@/util/ConstData';
import { redirect } from 'next/navigation';
import { stringToNumber } from '@/util/NumberUtil';
import CategoryCard from '@/ui/component/CategoryCard';
import { ScrollShadow } from '@heroui/scroll-shadow';

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
    // 使用默认第一个页码
    redirect(
      `/category?page=${stringToNumber(searchParams?.page, 1)}&size=${PAGE_SIZE_LIST[0]}`,
    );
  }

  const [categoryRes] = await Promise.all([
    apiCategoryGetCategory(
      stringToNumber(searchParams?.page, 1),
      stringToNumber(searchParams?.size, 10),
    ),
  ]);
  const categoryList = categoryRes.data;
  // 标签总数
  const totalData = categoryList?.totalData ?? 0;

  return (
    <div className="p-6 flex flex-col gap-4 h-full">
      <div className="text-3xl font-semibold text-gray-600 select-none dark:text-white ">
        <p>{totalData > 0 ? `& ${totalData} 个分类` : '暂无分类'}</p>
      </div>
      <div className="flex-grow">
        {categoryList?.data ? (
            <ScrollShadow className="p-4 max-h-[calc(100dvh-215px)]">
              <div className="flex gap-4 flex-wrap">
                {categoryList.data.map((category) => (
                  <CategoryCard category={category} key={category.categoryId} />
                ))}
              </div>
            </ScrollShadow>
        ) : null}
      </div>

      {/*分页组件*/}
      {categoryList && (
        <div className="flex justify-center">
          <PaginationContainer pager={categoryList} route="/category" />
        </div>
      )}
    </div>
  );
}
