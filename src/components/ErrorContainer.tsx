'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';

/**
 * 错误显示容器
 * @param msg
 * @param onReset 重试按钮点击事件,不传时按钮变为返回首页
 */
export default function ErrorContainer({
  msg,
  onReset,
}: {
  msg: string;
  onReset?: () => void;
}) {
  const constraintsRef = useRef(null);
  const router = useRouter();

  return (
    <motion.div
      className="size-full flex justify-center items-center flex-col gap-4 select-none"
      initial={{ opacity: 0, scale: 0.5, y: -120 }}
      animate={{
        opacity: 1,
        scale: 1.0,
        y: 0,
        transition: { type: 'spring', duration: 0.6 },
      }}
      ref={constraintsRef}
    >
      <motion.div
        className="relative h-12 w-64 flex justify-center items-center cursor-pointer shadow-lg"
        drag
        dragConstraints={constraintsRef}
        whileTap={{
          scale: 0.8,
          rotate: 6,
        }}
        whileHover={{
          scale: 1.1,
        }}
      >
        <p className="text-[2rem] font-bold text-white z-10">ERROR</p>
        <div className="absolute w-64 h-12 bg-red-500 top-0 left-0 z-5"></div>
      </motion.div>
      <p className="text-medium">{msg}</p>
      <Button
        className="bg-default/30"
        size="sm"
        onPress={() => {
          if (onReset) {
            onReset();
          } else {
            // redirect 在客户端事件中不受支持,用 router.push
            router.push('/');
          }
        }}
      >
        {onReset ? '重试' : '返回首页'}
      </Button>
    </motion.div>
  );
}
