import CardSkeleton from '@/ui/component/CardSkeleton';
import { ScrollShadow } from '@heroui/scroll-shadow';

export default function Loading() {
  return (
    <div className="fadeIn-container flex flex-col h-full pt-6 pl-6 pr-1 gap-4">
      <CardSkeleton className="w-48 h-10" />
      <ScrollShadow className="max-h-[calc(100dvh-170px)] md:max-h-[calc(100dvh-140px)]">
        <div className="flex gap-4 flex-wrap">
          {Array.from({ length: 12 }).map((_, index) => (
            <CardSkeleton
              key={index}
              className="w-[calc(100dvw-3rem)] md:w-40 xl:w-80 h-40"
            />
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}
