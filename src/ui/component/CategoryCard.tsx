import { Category } from '@/models/Category';
import { Card, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';
import { getImageRealUrl } from '@/util/UrlUtil';

export default function CategoryCard({ category }: { category: Category }) {
  const firstChar =
    category.displayName.length > 0 ? category.displayName[0] : '';

  // 背景板内容
  const background = category.cover ? (
    <Image
      alt={category.displayName}
      className="transition-all object-cover w-24 h-24 md:w-40 md:h-40"
      src={getImageRealUrl(category.cover)}
    />
  ) : (
    <div className="relative text-[3.75rem] md:text-[8rem] font-bold  size-full overflow-hidden">
      <div className="blur-sm absolute hidden dark:block dark:opacity-50 left-1 -bottom-4 md:-bottom-10">
        {firstChar}
      </div>
      <div className="text-gray-500 dark:text-foreground dark:opacity-60 absolute left-1 -bottom-4 md:-bottom-10">
        {firstChar}
      </div>
    </div>
  );
  return (
    <Card
      isHoverable
      isFooterBlurred
      className="scaleIn-container bg-transparent fadeIn-container group w-24 h-24 md:w-40 md:h-40 transition-all border-none cursor-pointer hover:-translate-y-0.5"
      radius="lg"
    >
      <CardBody className="relative m-0 p-0 overflow-hidden">
        {/*背景板*/}
        <div className="w-24 h-24 md:w-40 md:h-40">{background}</div>
        {/*分类名*/}
        <div className="transition-all absolute rounded-xl bottom-0 left-0 m-1 p-0 md:p-2 bg-black/15 group-hover:bg-black/30 w-[calc(100%-0.5rem)] z-20 backdrop-blur shadow-small border-1 border-white/20 overflow-hidden">
          <p className="text-small font-semibold text-white/80 w-full text-center">
            {category.displayName}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
