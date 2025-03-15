import CardSkeleton from '@/ui/component/CardSkeleton';
import { ScrollShadow } from '@heroui/scroll-shadow';

export default function Loading() {
  return (
    <div className="fadeIn-container flex flex-col h-full pt-6 pl-6 pr-1">
      <CardSkeleton className="w-48 h-10" />
      <div className="mt-2">
        <ScrollShadow className="py-2 max-h-[calc(100dvh-170px)] md:max-h-[calc(100dvh-140px)]">
          <div className="flex gap-4 flex-wrap">
            {
              Array.from({length: 12}).map((_, index) => (
                <CardSkeleton key={index} className="w-20 h-7 rounded-full"/>
              ))
            }
          </div>
        </ScrollShadow>
      </div>
    </div>
  );
}
