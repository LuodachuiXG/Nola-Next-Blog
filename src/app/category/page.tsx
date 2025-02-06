import { Metadata } from 'next';
import { apiCategoryGetCategory } from '@/api/apiCategory';

export const metadata: Metadata = {
  title: '分类',
};

export const revalidate = 60;

/**
 * 分类页面
 * @constructor
 */
export default async function CategoryPage() {
  const [categoryRes] = await Promise.all([apiCategoryGetCategory(1, 10)]);
  const categoryList = categoryRes.data;
  // 标签总数
  const totalData = categoryList?.totalData ?? 0;
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="text-3xl font-semibold text-primary select-none dark:text-white ">
        <p>{totalData > 0 ? `& ${totalData} 个分类` : '暂无分类'}</p>
      </div>
      <div>
        {categoryList?.data ? (
          <div className="flex gap-4 flex-wrap">
            {categoryList.data.map((category) => (
              <div key={category.categoryId}>{category.displayName}</div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
