import { ScrollShadow } from '@heroui/scroll-shadow';
import { Skeleton } from '@heroui/skeleton';

export default function Loading() {
  return (
    <div className="fadeIn-container flex justify-center">
      <ScrollShadow className="w-full max-h-[calc(100dvh-55px)] md:max-h-[calc(100dvh-25px)]">
        <div className="flex flex-col items-center overflow-hidden w-dvw md:w-auto">
          <div className="flex flex-col gap-4 w-dvw md:max-w-[70ch] lg:max-w-[80ch] 2xl:max-w-[110ch] p-6">
            <Skeleton className="w-80 h-10"></Skeleton>
            <div className="flex gap-2 items-center">
              <Skeleton className="w-24 h-4"></Skeleton>
              <VerticalDivider />
              <Skeleton className="w-24 h-4"></Skeleton>
              <VerticalDivider />
              <Skeleton className="w-24 h-4"></Skeleton>
            </div>

            <div className="w-full flex flex-col gap-3">
              {Array.from({ length: 11 }).map((_, i) => (
                <Skeleton className="w-full h-5" key={i}></Skeleton>
              ))}
              <Skeleton className="w-1/3 h-5"></Skeleton>
            </div>
          </div>
        </div>
      </ScrollShadow>
    </div>
  );
}

function VerticalDivider() {
  return <div className="w-divider h-3 bg-divider"></div>;
}
