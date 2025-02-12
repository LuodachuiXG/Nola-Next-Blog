'use client';

import { Pagination } from '@heroui/pagination';
import { Popover, PopoverTrigger, PopoverContent } from '@heroui/popover';
import { Button } from '@heroui/button';
import { Pager } from '@/models/Pager';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { PAGE_SIZE_LIST } from '@/util/ConstData';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

/**
 * 分页组件
 * @param pager 分页接口
 * @param route 调用该组件的路由页面地址（如果设置了路由地址，在页码和每页条数改变时，会自动跳转到该路由，并附带 page 和 size 参数）
 * @param onChange 改变事件（当前页数，每页条数）
 */
export default function PaginationContainer<T>({
  pager,
  route,
  onChange,
}: {
  pager: Pager<T>;
  route?: string;
  onChange?: (page: number, size: number) => void;
}) {
  // popover 的状态
  const popoverState = useOverlayTriggerState({});

  // 当前页
  const [currentPage, setCurrentPage] = useState(1);

  // 当前每页条数
  const [currentPageSize, setCurrentPageSize] = useState(40);
  useEffect(() => {
    // 如果当前每页条数是一个合理的条数（在每页条数列表中），则设为当前条数
    if (PAGE_SIZE_LIST.includes(pager.size)) {
      setCurrentPageSize(pager.size);
    }
  }, [pager.size]);

  /**
   * 改变事件
   * @param page 当前页
   * @param size 每页大小
   */
  function change(page: number, size: number) {
    onChange?.(page, size);
    if (route) {
      // 跳转路由并附带页码信息
      redirect(`${route}?page=${page}&size=${size}`);
    }
  }

  return (
    <div className="flex items-center flex-wrap justify-center">
      <Pagination
        showControls
        showShadow
        initialPage={1}
        total={pager.totalPages}
        page={currentPage}
        variant="light"
        onChange={(page) => {
          setCurrentPage(page);
          change(page, currentPageSize);
        }}
      />

      <Popover showArrow backdrop="blur" placement="top" state={popoverState}>
        <PopoverTrigger>
          <Button size="md" variant="light" className="text-foreground/85">
            {currentPageSize} / 页
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-[180px] p-2">
            <p className="my-1 text-foreground/50">选择每页条数</p>
            <ScrollShadow className="max-h-[260px]">
              <div className="flex flex-col">
                {PAGE_SIZE_LIST.map((size) => (
                  <Button
                    key={size}
                    color={currentPageSize === size ? 'primary' : 'default'}
                    variant="light"
                    onPress={() => {
                      // 关闭 popover
                      popoverState.close();
                      // 改变每页大小后，将当前页改为第一页
                      setCurrentPage(1);
                      setCurrentPageSize(size);
                      change(1, size);
                    }}
                  >
                    {size} / 页
                  </Button>
                ))}
              </div>
            </ScrollShadow>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
