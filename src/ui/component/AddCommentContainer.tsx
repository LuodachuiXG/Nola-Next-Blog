'use client';
import { Post } from '@/models/Post';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/react';
import { useActionState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { commentActionAddComment } from '@/lib/commentActions';
import { toast } from '@/util/ToastUtil';

/**
 * 评论容器组件
 * @param post 文章接口
 */
export default function AddCommentContainer({ post }: { post: Post }) {
  return (
    <div className="w-full px-5 py-6">
      {/*添加评论表单*/}
      <CommentForm post={post} />
    </div>
  );
}

/**
 * 评论表单组件
 */
function CommentForm({ post }: { post: Post }) {
  const addComment = commentActionAddComment.bind(null, post.postId);
  const [state, fromAction, isPending] = useActionState(addComment, {
    code: -1,
    errMsg: null,
    data: null,
  });

  useEffect(() => {
    // -1 为初始状态，不处理
    if (state.code !== -1) {
      if (state.code === 200) {
        // 评论添加成功
        toast('评论已发送，审核通过后即可显示', 'success');
      } else {
        // 评论添加失败
        toast(state.errMsg ?? '未知错误，请稍后重试', 'danger');
      }
    }
  }, [state]);

  return (
    <Form action={fromAction}>
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4 flex-col md:flex-row">
          <Input
            className="flex-grow"
            label="昵称"
            name="displayName"
            type="text"
            placeholder="请输入昵称"
            isRequired
            size="sm"
            disabled={isPending}
          />

          <Input
            className="flex-grow"
            label="邮箱"
            name="email"
            type="email"
            placeholder="请输入邮箱（非公开展示）"
            isRequired
            size="sm"
            disabled={isPending}
          />

          <Input
            className="flex-grow"
            label="站点"
            name="site"
            type="url"
            placeholder="请输入站点"
            size="sm"
            disabled={isPending}
          />
        </div>

        <Textarea
          label="内容"
          type="text"
          name="content"
          placeholder="请输入评论内容"
          isClearable
          isRequired
          maxRows={16}
          disabled={isPending}
        />

        <div className="text-right">
          <Button
            className="w-full md:w-fit"
            color="primary"
            type="submit"
            isLoading={isPending}
          >
            {isPending ? '请稍等' : '发送'}
          </Button>
        </div>
      </div>
    </Form>
  );
}
