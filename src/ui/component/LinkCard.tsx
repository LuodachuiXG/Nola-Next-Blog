import { Link } from '@/models/Link';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Image } from '@heroui/image';
import { getImageRealUrl } from '@/util/UrlUtil';
import { Link as LinkIcon } from '@ricons/carbon';

/**
 * 友情链接卡片
 * @param link
 * @constructor
 */
export default function LinkCard({ link }: { link: Link }) {
  const firstChar = link.displayName.length > 0 ? link.displayName[0] : '';
  const background = link.logo ? (
    <Image
      alt="Card background"
      className="object-cover rounded-xl w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44"
      src={getImageRealUrl(link.logo)}
    />
  ) : (
    <div className="relative border-1 border-foreground/5 text-[3.75rem] md:text-[8rem] font-bold rounded-xl w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44">
      <div className="blur-sm hidden dark:block dark:opacity-50 absolute -bottom-5 md:-bottom-10 left-2">
        {firstChar}
      </div>
      <div className="text-gray-500 dark:text-foreground dark:opacity-60 absolute -bottom-5 md:-bottom-10 left-2">
        {firstChar}
      </div>
    </div>
  );

  return (
    <div className="fadeIn-container">
      <a href={link.url} target="_blank">
        <Card
          className="group transition-all cursor-pointer py-1 bg-transparent hover:-translate-y-0.5"
          isHoverable
          shadow="sm"
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="text-tiny uppercase font-bold flex gap-2 items-center">
              <LinkIcon className="w-4 h-4" />
              LINK
            </div>
            <h4 className="font-bold text-large">{link.displayName}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <div className="relative">
              {background}

              {/*半透明链接描述*/}
              {link.description && (
                <div className="transition-all absolute rounded-xl bottom-0 left-0 m-1 p-2 bg-black/10 group-hover:bg-black/30 w-[calc(100%-0.5rem)] z-20 backdrop-blur shadow-small border-1 border-white/20 overflow-hidden">
                  <p className="text-small text-white/80 w-full line-clamp-4">
                    {link.description}
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </a>
    </div>
  );
}
