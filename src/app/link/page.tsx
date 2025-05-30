import { Metadata } from 'next';
import { apiLinkGetLinks } from '@/api/apiLink';
import { ScrollShadow } from '@heroui/scroll-shadow';
import LinkCard from '@/ui/component/LinkCard';
import ErrorContainer from '@/ui/component/ErrorContainer';

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

  if (linkRes.errMsg) {
    return <ErrorContainer msg={linkRes.errMsg} />;
  }

  // 正常链接
  const linkList = linkRes.data?.data?.filter((link) => !link.isLost) ?? [];

  // 已失联的链接
  const ripLink = linkRes.data?.data?.filter((link) => link.isLost) ?? [];

  // 总友情链接数量
  const totalData = linkRes?.data?.totalData ?? 0;
  return (
    <div className="pt-6 pl-6 pr-1 flex flex-col gap-4 h-full">
      <div className="text-3xl font-semibold text-gray-600 select-none dark:text-white">
        <p>{totalData > 0 ? `@ ${totalData} 个友联` : '暂无友联'}</p>
      </div>

      <div className="flex-grow">
        {linkList ? (
          <ScrollShadow className="p-4 h-[calc(100dvh-135px)] md:h-[calc(100dvh-100px)]">
            <div className="flex gap-4 flex-wrap">
              {/*先显示正常链接*/}
              {linkList.map((link, i) => (
                <LinkCard link={link} key={i} />
              ))}

              {/*再显示失联链接*/}
              {ripLink.map((link, i) => (
                <LinkCard link={link} key={i} />
              ))}
            </div>
          </ScrollShadow>
        ) : null}
      </div>
    </div>
  );
}
