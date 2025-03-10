'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@heroui/button';
import { redirect } from 'next/navigation';
import { motion } from 'motion/react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const constraintsRef = useRef(null);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <motion.div
      className="size-full flex justify-center items-center flex-col gap-4 select-none"
      initial={{ opacity: 0, scale: 0.5, y: -120 }}
      animate={{ opacity: 1, scale: 1.0, y: 0 }}
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
        whileDrag={{
          rotate: 720,
          transition: {
            // 无限循环
            repeat: Infinity,
            duration: .1,
          },
        }}
      >
        <p className="text-[2rem] font-bold text-white z-10">ERROR</p>
        <div className="absolute w-64 h-12 bg-red-500 top-0 left-0 z-5"></div>
      </motion.div>
      <p className="font-semibold text-[2rem]">
        {typeof error === 'object' ? error.message : error}
      </p>
      <Button
        className="bg-default/30"
        size="sm"
        onPress={() => {
          redirect('/');
        }}
      >
        返回首页
      </Button>
    </motion.div>
  );
}
