import { Avatar } from '@heroui/avatar';

/**
 * 阴影头像（以头像图片底色作为阴影）
 * @param src 头像链接
 * @param alt Alt
 * @param size 头像大小 ['sm', 'md', 'lg']，默认 'md'
 * @constructor
 */
export default function ShadowAvatar({
  src,
  alt,
  size
}: {
  src: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <div className="relative">
      <Avatar
        className="absolute blur-md opacity-50 z-10"
        src={src}
        size={size ?? 'md'}
        alt={alt}
      />
      <Avatar
        className="z-20"
        src={src}
        size={size ?? 'md'}
        isBordered
        alt={alt}
      />
    </div>
  );
}
