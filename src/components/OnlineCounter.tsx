'use client';
import { useOnlineCount } from '@/hooks/useOnlineCount';
import { Tooltip } from '@heroui/tooltip';
import { Link as WebSocketIcon } from '@ricons/carbon';
import { clsx } from 'clsx';
import { formatDate } from '@/util/DateUtil';
/**
 * 博客在线人数显示组件
 */
export default function OnlineCounter({ className }: { className?: string }) {
  const { onlineCount, updateTime } = useOnlineCount();

  const tooltip = (
    <div className="flex flex-col gap-2 text-foreground text-xs py-1 select-none">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <p>通过 WebSocket</p>
          <WebSocketIcon className="size-3" />
          <p>实时获取在线人数</p>
        </div>
        <div className="flex items-center gap-1">
          <p>连接状态：</p>
          <div
            className={clsx(
              "relative size-2 rounded-full after:content-[''] after:z-0 after:absolute after:size-2 after:rounded-full after:animate-ping",
              {
                'bg-green-500 after:bg-green-500': onlineCount >= 0,
                'bg-red-500 after:bg-red-500': onlineCount < 0,
              },
            )}
          ></div>
          <p>{onlineCount >= 0 ? '已连接' : '未连接'}</p>

          {/*未连接时点击刷新页面*/}
          {onlineCount < 0 && (
            <p
              className="text-xs text-foreground hover:text-primary cursor-pointer transition-colors pl-1"
              onClick={() => window.location.reload()}
            >
              点击刷新页面
            </p>
          )}
        </div>
        <p>更新时间：{updateTime > 0 ? formatDate(updateTime, true) : '未知'}</p>
      </div>
    </div>
  );

  return (
    <Tooltip content={tooltip} showArrow>
      <div className={className}>
        {/*获取在线人数成功*/}
        {onlineCount >= 0 && (
          <div className="flex gap-2 items-center ">
            <>
              <div className="relative size-2 bg-green-500 rounded-full after:content-[''] after:z-0 after:absolute after:size-2 after:rounded-full after:bg-green-500 after:animate-ping"></div>
            </>
            <p>在线人数：{onlineCount} 人</p>
          </div>
        )}

        {/*获取在线人数失败*/}
        {onlineCount < 0 && (
          <div className="flex gap-2 items-center ">
            <div className="relative size-2 bg-red-500 rounded-full"></div>
            <p>在线人数：未知</p>
          </div>
        )}
      </div>
    </Tooltip>
  );
}
