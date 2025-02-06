import { Metadata } from 'next';
import { apiTagGetTag } from '@/api/apiTag';
import TagChip from '@/ui/component/TagChip';

export const metadata: Metadata = {
  title: '标签',
};

export const revalidate = 60;

/**
 * 标签页面
 * @constructor
 */
export default async function TagPage() {
  const [tagRes] = await Promise.all([apiTagGetTag(1, 10)]);
  const tagList = tagRes.data;
  // 标签总数
  const totalData = tagList?.totalData ?? 0;
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="text-3xl font-semibold text-primary select-none dark:text-white ">
        <p>{totalData > 0 ? `# ${totalData} 个标签` : '暂无标签'}</p>
      </div>
      <div>
        {tagList?.data ? (
          <div className="flex gap-4 flex-wrap">
            {tagList.data.map((tag) => (
              <TagChip tag={tag} key={tag.tagId} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
