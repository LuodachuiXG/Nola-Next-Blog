import { Metadata } from 'next';
import { apiLinkGetLinks } from '@/api/apiLink';
import { ScrollShadow } from '@heroui/scroll-shadow';
import CategoryCard from '@/ui/component/CategoryCard';
import LinkCard from '@/ui/component/LinkCard';

export const metadata: Metadata = {
  title: '友情链接',
};

export const revalidate = 0;

/**
 * 友情链接页面
 * @constructor
 */
export default async function LinkPage() {
  // 默认获取所有友情链接，不分页
  const [linkRes] = await Promise.all([apiLinkGetLinks(0, 0)]);
  const linkList = linkRes.data;
  // 总友情链接数量
  const totalData = linkList?.totalData ?? 0;
  return (
    <div className="p-6 flex flex-col gap-4 h-full">
      <div className="text-3xl font-semibold text-gray-600 select-none dark:text-white ">
        <p>{totalData > 0 ? `@ ${totalData} 个友联` : '暂无友联'}</p>
      </div>

      <div className="flex-grow">
        {linkList?.data ? (
          <ScrollShadow className="p-4 max-h-[calc(100dvh-135px)]">
            <div className="flex gap-4 flex-wrap">
              {linkList.data.map((link, i) => (
                <LinkCard link={link} key={i} />
              ))}
            </div>
          </ScrollShadow>
        ) : null}
      </div>
    </div>
  );
}
