import { useEffect, useRef, useState } from 'react';
import { OnlineCountResponse } from '@/models/response/OnlineCountResponse';

/**
 * 获取当前博客在线人数 Hook
 */
export const useOnlineCount = () => {
  // 当前人数
  const [onlineCount, setOnlineCount] = useState<number>(0);
  // 更新时间戳
  const [updateTime, setUpdateTime] = useState<number>(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 创建 WebSocket 连接

    // 获取服务器地址，删除 http/https
    const serverUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
    if (!serverUrl) {
      setOnlineCount(-1)
      setUpdateTime(-1)
      console.error('WEBSOCKET_URL is not defined');
      return;
    }
    const wsUrl = `${serverUrl}/api/overview/online`;

    // 创建 WebSocket 连接
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    // 监听服务器消息
    ws.onmessage = (event) => {
      try {
        if (String(event.data) == 'ping') {
          // 当前是 ping，无需处理
        } else {
          const data: OnlineCountResponse = JSON.parse(event.data);
          setOnlineCount(data.count);
          setUpdateTime(data.timestamp)
        }
      } catch (error) {
        setOnlineCount(-1)
        setUpdateTime(-1)
        console.error(`WebSocket 解析消息失败：${error}`);
      }
    };

    ws.onopen = () => {
      // 连接成功
    }

    ws.onclose = () => {
      console.log('WebSocket 连接已关闭');
      setOnlineCount(-1)
      setUpdateTime(-1)
    }

    ws.onerror = (error) => {
      console.error(`WebSocket 错误：${error}`);
      setOnlineCount(-1)
      setUpdateTime(-1)
    }

    // 页面卸载时关闭连接
    const handleBeforeUnload = () => {
      ws.close();
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      ws.close();
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, []);
  return {
    onlineCount: onlineCount,
    updateTime: updateTime
  }
};
