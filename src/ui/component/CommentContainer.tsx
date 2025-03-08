'use client';
import { Post } from '@/models/Post';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/react';
import { useActionState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { commentActionAddComment } from '@/lib/commentActions';
import { toast } from '@/util/ToastUtil';
import { Pager } from '@/models/Pager';
import { redirect } from 'next/navigation';
import PaginationContainer from '@/ui/component/PaginationContainer';
import { Comment } from '@/models/Comment';
import TimeFormatLabel from '@/ui/component/TimeFormatLabel';
import { stringToNumber } from '@/util/NumberUtil';
import { AddComment as AddCommentIcon } from '@ricons/carbon';

/**
 * 评论容器组件
 * @param post 文章接口
 * @param commentList 评论列表
 */
export default function CommentContainer({
  post,
  commentList,
}: {
  post?: Post | null;
  commentList?: Pager<Comment> | null;
}) {
  return (
    <div className="w-full px-5 py-6 flex flex-col">
      {/*添加评论表单*/}
      {post && (
        <>
          <CommentForm post={post} />
          {commentList && <CommentList commentList={commentList} post={post} />}
        </>
      )}
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
      <div className="w-full flex flex-col gap-4" id="comment-container">
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

/**
 * 评论列表
 * @param commentList 评论列表数据
 * @param post 文章接口
 */
function CommentList({
  commentList,
  post,
}: {
  commentList: Pager<Comment> | null;
  post: Post;
}) {
  // 判断用户是否手动输入了错误的页码，在分页组件中已经有了类似判断
  // 这里再加一次是因为下面的页码组件只有在有数据的时候才会调用，所有分页组件中的判断无法触发，所以这里再加一次
  if (!commentList || (commentList.data.length <= 0 && commentList.page > 1)) {
    // 评论列表为空，并且当前评论页码大于 1，可能是用户在地址栏输入了错误的页码，跳转到第一页
    redirect(`/post?slug=${post.slug}`);
  }

  /**
   * 暂无评论
   */
  function NoComment() {
    return (
      <div className="py-24 text-base w-full text-center text-default-500">
        暂无评论
      </div>
    );
  }

  return (
    <div id="comment-container" className="w-full  my-6">
      {!commentList || commentList.data.length <= 0 ? (
        <NoComment />
      ) : (
        <div className="w-full flex flex-col gap-6">
          {commentList.data.map((comment) => (
            <CommentItem comment={comment} key={comment.commentId} />
          ))}

          <PaginationContainer
            pager={commentList}
            route={`/post?slug=${post.slug}`}
          />
        </div>
      )}
    </div>
  );
}

/**
 * 评论项
 * @param comment 评论接口
 */
export function CommentItem({ comment }: { comment: Comment }) {
  function onReplyClick() {
    // 跳转到 ID 为 comment-container 的位置
    window.scrollTo({
      top: document.getElementById(`comment-container`)?.offsetTop,
      behavior: 'smooth',
    });
  }

  /**
   * 评论头像
   */
  function Avatar({ c }: { c: Comment }) {
    return (
      <a href={c.site ?? ''} target="_blank">
        <div className="bg-primary size-10 rounded-full flex justify-center items-center text-white shadow-lg select-none">
          {c.displayName.at(0)}
        </div>
      </a>
    );
  }

  return (
    <div className="group w-full flex gap-2 items-start rounded-xl p-2 hover:shadow-lg transition-all border-1 border-transparent hover:border-divider dark:hover:border-white/50">
      {/*左侧头像*/}
      <Avatar c={comment} />
      {/*右侧评论内容及信息*/}
      <div className="flex-grow flex flex-col">
        {/*昵称和时间*/}
        <div className="flex justify-between items-center">
          <a href={comment.site ?? ''} target="_blank">
            <p id={`comment_${comment.commentId}`} className="text-sm">
              {comment.displayName}
            </p>
          </a>
          <div className="text-sm text-default-500 flex gap-2">
            <TimeFormatLabel time={stringToNumber(comment.createTime)} />
            <div
              className="cursor-pointer group-hover:text-primary"
              onClick={onReplyClick}
            >
              <AddCommentIcon className="size-5" />
            </div>
          </div>
        </div>

        {/*评论内容*/}
        <div className="w-full text-base text-foreground break-all">
          {comment.content}
        </div>
      </div>
    </div>
  );
}
