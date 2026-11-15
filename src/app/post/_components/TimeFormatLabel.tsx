import { Tooltip } from '@heroui/tooltip';
import { formatDate, formatDateDesc } from '@/util/DateUtil';
import { clsx } from 'clsx';

/**
 * 格式化时间 Label
 * 默认显示简化时间，鼠标停留显示具体时间
 * @param time 时间戳（毫秒）
 * @param className 类名
 */
export default function TimeFormatLabel({
  time,
  className,
}: {
  time: number;
  className?: string;
}) {
  return (
    <Tooltip delay={300} content={<span className="text-foreground">{formatDate(time, true)}</span>}>
      <span className={clsx(className, 'cursor-default')}>{formatDateDesc(time)}</span>
    </Tooltip>
  );
}
