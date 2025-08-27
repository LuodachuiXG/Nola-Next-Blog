import CardSkeleton from '@/ui/component/CardSkeleton';

/**
 * 文章加载骨架屏
 */
export default function Loading() {
  return (
    <div className="p-4 h-full w-full fadeIn-container">
      <div className="grid grid-flow-row-dense gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <CardSkeleton
            key={index}
            className="w-full h-40"
          />
        ))}
      </div>
    </div>
  );
}
