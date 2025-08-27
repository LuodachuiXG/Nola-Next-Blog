import { Category } from '@/models/Category';
import { Card, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';
import { getImageRealUrl } from '@/util/UrlUtil';
import { Link } from '@heroui/link';
import { clsx } from 'clsx';

export default function CategoryCard({ category }: { category: Category }) {
  const firstChar =
    category.displayName.length > 0 ? category.displayName[0] : '';

  // 背景板内容
  const background = category.cover ? (
    <Image
      alt={category.displayName}
      className="object-cover w-24 h-24 md:w-40 md:h-40 group-hover:scale-110"
      src={getImageRealUrl(category.cover)}
      radius="none"
    />
  ) : (
    <div className="relative text-[3.75rem] md:text-[8rem] font-bold size-full overflow-hidden group-hover:scale-110 transition-transform select-none">
      <div className=" absolute hidden dark:block dark:opacity-50 left-1 bottom-4 md:bottom-10">
        {firstChar}
      </div>
      <div className="text-gray-500 dark:text-foreground dark:opacity-60 absolute left-1 bottom-4 md:bottom-10">
        {firstChar}
      </div>
    </div>
  );
  return (
    <div className="transition-all hover:-translate-y-0.5 group">
      <Card
        className="scaleIn-container bg-transparent w-24 h-24 md:w-40 md:h-40 cursor-pointer shadow-small rounded-lg"
        as={Link}
        href={`/?category=${category.displayName}`}
        radius="lg"
      >
        <CardBody className="relative m-0 p-0 overflow-hidden dark:dark:bg-[#1B1C20] bg-white">
          {/*背景板*/}
          <div className="w-24 h-24 md:w-40 md:h-40">{background}</div>
          {/*分类名*/}
          <div
            className={clsx(
              'backdrop-blur transition-all absolute rounded-lg bottom-0 left-0 m-1 p-1 md:p-2 bg-black/30 w-[calc(100%-0.5rem)] z-20 shadow-lg overflow-hidden',
              {
                'bg-black/60': category.cover,
              },
            )}
          >
            <p className="text-small font-semibold text-white/80 w-full text-center">
              {category.displayName}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
