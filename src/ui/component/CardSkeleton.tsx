import { Skeleton } from '@heroui/skeleton';
import { clsx } from 'clsx';

export default function CardSkeleton({ className }: { className?: string }) {
  return <Skeleton className={clsx('rounded-xl', className)}></Skeleton>;
}
