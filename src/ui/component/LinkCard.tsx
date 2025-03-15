import { Link } from '@/models/Link';
import { Image } from '@heroui/image';
import { getImageRealUrl } from '@/util/UrlUtil';

/**
 * 友情链接卡片
 * @param link
 * @constructor
 */
export default function LinkCard({ link }: { link: Link }) {
  const firstChar = link.displayName.length > 0 ? link.displayName[0] : '';

  return (
    <div className="transition-transform hover:-translate-y-0.5 group">
      <a href={link.url} target="_blank">
        <div className="scaleIn-container shadow-small cursor-pointer w-24 md:w-36 lg:w-44 flex flex-col rounded-xl overflow-hidden">
          <div className="relative rounded-xl shadow-sm shadow-black/5 overflow-hidden w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44">
            {/*图片*/}
            <Image
              alt={link.displayName}
              className="object-cover w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 transition-transform group-hover:scale-125 group-hover:rotate-2"
              src={getImageRealUrl(link.logo)}
            />

            {/*代替图片显示的文字*/}
            <div className="absolute top-0 left-0 size-full z-0 text-[3.75rem] md:text-[8rem] font-bold bg-gray-400/10 dark:bg-transparent rounded-xl">
              <div className=" hidden dark:block dark:opacity-50 absolute -bottom-5 md:-bottom-10 left-2">
                {firstChar}
              </div>
              <div className="text-gray-500 dark:text-foreground dark:opacity-60 absolute -bottom-5 md:-bottom-10 left-2">
                {firstChar}
              </div>
            </div>

            {/*hover 时显示的描述*/}
            {link.description && link.description.length > 0 && (
              <div className="absolute top-0 left-0 w-full h-full z-20 p-1 overflow-hidden">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity max-h-[3.32rem] line-clamp-2 md:max-h-[4.55rem] md:line-clamp-3 lg:max-h-[7.25rem] lg:line-clamp-6 break-words w-full rounded-xl text-sm bg-black/60 p-2 backdrop-blur shadow-small text-white">
                  {link.description}
                </div>
              </div>
            )}
          </div>

          {/*链接详情*/}
          <div className="p-1 md:p-2">
            <p className="line-clamp-1 break-words">
              {link.displayName}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
