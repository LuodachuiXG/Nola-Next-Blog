import { Card, CardBody, CardHeader } from '@heroui/card';

/**
 * 博客文章页面
 * @constructor
 */
export default async function PostPage() {
  return (
    <div className="p-4">
      <Card
        className="transition-all cursor-pointer hover:backdrop-filter-none"
        isBlurred
        shadow="sm"
      >
        <CardHeader className="font-semibold">测试文章</CardHeader>
        <CardBody className="font-normal text-foreground/70">这是一个文章内容</CardBody>
      </Card>
    </div>
  );
}
