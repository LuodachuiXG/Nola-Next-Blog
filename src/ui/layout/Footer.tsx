import { clsx } from 'clsx';
import { apiConfigGetICP } from '@/api/apiConfig';
import OnlineCounter from '@/ui/component/OnlineCounter';
import { apiOverviewGetOverview } from '@/api/apiOverview';
import { Divider } from '@heroui/divider';

/**
 * 页脚
 * @param className
 * @constructor
 */
export default async function Footer({ className }: { className?: string }) {
  const [icpRes, overviewRes] = await Promise.all([
    // ICP 备案信息
    apiConfigGetICP(),
    // 概览数据
    apiOverviewGetOverview()
  ]);

  // ICP 备案信息
  const icp = icpRes.data;

  // 概览数据
  const overview = overviewRes.data;

  return (
    <div
      className={clsx(
        className,
        'p-4 flex flex-col gap-2 justify-center text-foreground/60 dark:text-white/70 text-tiny bg-white dark:bg-content2',
      )}
    >
      <div className="flex gap-2">
        {/*在线人数*/}
        <OnlineCounter />

        {/*<Divider orientation="h"/>*/}

        {/*文章总浏览量*/}
        {overview && (
          <div>
            <p>文章总浏览量：{overview.postVisitCount}</p>
          </div>
        )}
      </div>

      {/*备案信息*/}
      {icp && (icp.police || icp.icp) && (
        <div className="flex gap-2 line-clamp-1">
          {/*ICP*/}
          {icp.icp && <a href="https://beiancx.miit.gov.cn/" target="_blank">{icp.icp}</a>}
          {/*公安网备*/}
          {icp.police && <a href="https://beian.mps.gov.cn/" target="_blank">{icp.police}</a>}
        </div>
      )}

      {/*Powered by*/}
      <p>
        Powered by
        <a href="https://github.com/LuodachuiXG/Nola" target="_blank">
          <span className="font-semibold ml-1 italic hover:text-primary transition-colors">
            Nola
          </span>
        </a>
      </p>
    </div>
  );
}
