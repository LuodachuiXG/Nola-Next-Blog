import { Link } from '@heroui/link';

/**
 * 可点击的 Link
 * @param displayName 显示名1
 * @param href 链接
 */
export default function ClickLink({
  displayName,
  href,
}: {
  displayName: string;
  href: string;
}) {
  return (
    <Link
      className="cursor-pointer hover:text-primary transition-colors text-tiny font-semibold text-default-500"
      href={href}
    >
      {displayName}
    </Link>
  );
}
