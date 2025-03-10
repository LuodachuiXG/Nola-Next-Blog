'use client';

import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { Alert } from '@heroui/alert';
import { motion } from 'motion/react';

/**
 * 客户端筛选条件 Alert
 * @param tag 标签名
 * @param category 分类名
 * @param 筛选数量
 */
export default function PostFilterAlert({
  tag,
  category,
  count,
}: {
  tag?: string | null;
  category?: string | null;
  count?: number | null;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: tag || category ? 1 : 0,
          height: tag || category ? 'auto' : 0,
          marginBottom: tag || category ? '1rem' : 0,
        }}
      >
        <Alert
          title={`条件筛选${count ? `（${count}个匹配）` : '（暂无匹配）'}`}
          color="warning"
          variant="faded"
          description={
            <div className="flex gap-2">
              {category && <div>#{category}</div>}
              {tag && <div>#{tag}</div>}
            </div>
          }
          endContent={
            <Button color="warning" size="sm" variant="flat" as={Link} href="/">
              取消筛选
            </Button>
          }
        />
      </motion.div>
    </>
  );
}
