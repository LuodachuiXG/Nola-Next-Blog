import { Metadata } from 'next';
import { apiTagGetTag } from '@/api/apiTag';
import {Chip} from "@heroui/chip";

export const metadata: Metadata = {
  title: '标签',
};

/**
 * 播客标签页面
 * @constructor
 */
export default async function TagPage() {
  const [tagRes] = await Promise.all([apiTagGetTag(1, 10)]);
  const tagList = tagRes.data;
  return (
    <div className="p-4">
      {tagList?.data ? (
        <div className="flex gap-4">
          {tagList.data.map((tag) => (
            <Chip variant="shadow" key={tag.tagId}>
              {tag.displayName}
            </Chip>
          ))}
        </div>
      ) : (
        <div>暂无标签</div>
      )}
    </div>
  );
}
