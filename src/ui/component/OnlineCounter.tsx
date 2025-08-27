'use client';
import { useOnlineCount } from '@/hooks/useOnlineCount';
/**
 * 博客在线人数显示组件
 */
export default function OnlineCounter({ className }: { className?: string }) {
  const onlineCount = useOnlineCount();
  return (
    <div className={className}>
      {/*获取在线人数成功*/}
      {onlineCount >= 0 && (
        <div className="flex gap-2 items-center ">
          <div className="relative size-2 bg-green-500 rounded-full after:content-[''] after:z-0 after:absolute after:size-2 after:rounded-full after:bg-green-500 after:animate-ping"></div>
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
  );
}
