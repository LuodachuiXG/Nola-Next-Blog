'use client';
import { Post } from '@/models/Post';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/react';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { Button } from '@heroui/button';
import { commentActionAddComment } from '@/lib/commentActions';
import { toast } from '@/util/ToastUtil';
import { Pager } from '@/models/Pager';
import { redirect } from 'next/navigation';
import PaginationContainer from '@/ui/component/PaginationContainer';
import { Comment } from '@/models/Comment';
import TimeFormatLabel from '@/ui/component/TimeFormatLabel';
import { stringToNumber } from '@/util/NumberUtil';
import {
  AddComment as AddCommentIcon,
  Reply as ReplayIcon,
  ArrowDown as ArrowDownIcon,
  Checkmark as CheckIcon,
  Add as AddIcon,
} from '@ricons/carbon';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { Chip } from '@heroui/chip';

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
          {post.allowComment && <CommentForm post={post} />}
          {commentList && <CommentList commentList={commentList} post={post} />}
        </>
      )}
    </div>
  );
}

/**
 * 评论表单组件
 * @param post 当前评论表单所在的文章
 * @param placeholder 评论内容框占位符（可空）
 * @param parentCommentId 父评论 ID（可空）
 * @param replyCommentId 回复评论 ID（可空）
 */
function CommentForm({
  post,
  placeholder,
  parentCommentId,
  replyCommentId,
}: {
  post: Post;
  placeholder?: string;
  parentCommentId?: number | null;
  replyCommentId?: number | null;
}) {
  const addComment = commentActionAddComment.bind(
    null,
    post.postId,
    parentCommentId ?? null,
    replyCommentId ?? null,
  );
  const [state, fromAction, isPending] = useActionState(addComment, {
    code: -1,
    errMsg: null,
    data: null,
  });

  // 昵称
  const [displayName, setDisplayName] = useState<string>('');
  // 邮箱
  const [email, setEmail] = useState<string>('');
  // 站点地址
  const [site, setSite] = useState<string>('');
  // 内容
  const [content, setContent] = useState<string>('');

  // 标记评论是否发送成功，并且设为 true 后 2 秒内恢复 false
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    // -1 为初始状态，不处理
    if (state.code !== -1) {
      if (state.code === 200) {
        // 评论添加成功
        toast('评论已发送，审核通过后即可显示', 'success');
        setIsSuccess(true);
        // 2 秒后恢复发送成功状态
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
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
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            disabled={isPending}
          />

          <Input
            className="flex-grow"
            label="站点"
            name="site"
            type="url"
            placeholder="请输入站点"
            size="sm"
            value={site}
            onChange={(e) => {
              setSite(e.target.value);
            }}
            disabled={isPending}
          />
        </div>

        <Textarea
          label="内容"
          type="text"
          name="content"
          placeholder={placeholder ?? '请输入评论内容'}
          isClearable
          isRequired
          maxRows={16}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          disabled={isPending}
        />

        <div className="text-right">
          <Button
            className="w-full md:w-fit"
            color={isSuccess ? 'success' : 'primary'}
            type="submit"
            isLoading={isPending}
            startContent={
              isPending ? null : isSuccess ? (
                <CheckIcon className="size-6" />
              ) : (
                <AddIcon className="size-6" />
              )
            }
            disabled={isSuccess || isPending}
            radius="sm"
          >
            {isSuccess ? '发送成功' : isPending ? '请稍等' : '发送'}
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
            <CommentItem
              comment={comment}
              key={comment.commentId}
              post={post}
            />
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
 * 评论头像
 */
function Avatar({ comment }: { comment: Comment }) {
  return (
    <a href={comment.site ?? undefined} target="_blank">
      <motion.div
        className="bg-primary size-10 rounded-full flex justify-center items-center text-white select-none"
        initial={{ rotate: 0 }}
        whileHover={{
          rotate: 360,
          scale: 1.1,
          transition: { duration: 0.4, type: 'spring' },
        }}
      >
        {comment.displayName.at(0)?.toUpperCase() ?? 'A'}
      </motion.div>
    </a>
  );
}

/**
 * 回复评论表单
 * @param post 当前评论所在的文章
 * @param showAddComment 是否显示表单
 * @param replyDisplayName 回复的人显示名
 * @param parentCommentId 父评论 ID
 * @param replyCommentId 回复评论 ID（可空）
 */
function ReplyForm({
  post,
  showAddComment,
  replyDisplayName,
  parentCommentId,
  replyCommentId,
}: {
  post: Post;
  showAddComment: boolean;
  replyDisplayName: string;
  parentCommentId: number;
  replyCommentId?: number | null;
}) {
  return (
    <AnimatePresence>
      {showAddComment && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: 'auto', // 使用测量高度
            transition: {
              height: { duration: 0.2 },
              opacity: { duration: 0.1 },
            },
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: {
              height: { duration: 0.2 },
              opacity: { duration: 0.1 },
            },
          }}
          className="p-2 flex flex-col gap-2 overflow-hidden"
        >
          <div className="text-default-500">
            回复&nbsp;
            <span className="text-primary font-semibold">
              {replyDisplayName}
            </span>
          </div>
          <CommentForm
            post={post}
            parentCommentId={parentCommentId}
            placeholder={`回复 ${replyDisplayName}：`}
            replyCommentId={replyCommentId}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * 评论项
 * @param comment 评论接口
 * @param post 文章接口
 */
export function CommentItem({
  comment,
  post,
}: {
  comment: Comment;
  post: Post;
}) {
  // 子评论楼层和实际评论 ID 映射
  const floorMap = useMemo(() => {
    const map = new Map<number, number>();
    if (comment.children && comment.children.length > 0) {
      comment.children.forEach((c, i) => {
        const floor = comment.children!.length - i;
        map.set(c.commentId, floor);
      });
    }
    return map;
  }, [comment]);

  // 是否显示子评论列表
  const [showChildren, setShowChildren] = useState(false);

  /**
   * 评论项内容
   * @param comment 评论接口
   * @param floor 评论楼层，用于在二层评论中显示楼层（可空）
   * @param isChild 当前评论是否是子评论（可空，默认顶层非子评论）
   */
  function Comment({
    mComment,
    floor,
    isChild,
  }: {
    mComment: Comment;
    floor?: number;
    isChild?: boolean;
  }) {
    // 是否在当前评论项下面显示添加评论的组件
    const [showAddComment, setShowAddComment] = useState(false);

    // 当前评论 Element ID（如果当前是子评论，就是父评论的 ID + 楼层，否则就是当前评论的 ID）
    let elementId = `comment_${mComment.parentCommentId ? mComment.parentCommentId : mComment.commentId}`;
    if (isChild) {
      // 当前评论是子评论，再在 ID 后加上楼层
      elementId += `_${floor}`;
    }

    /**
     * 楼层链接（仅出现在子评论上），点击跳转
     * @param mFloor 显示的楼层
     * @param actualTpFloor 实际要跳转的楼层（可空，默认为当前评论不加加楼层，即跳转父评论）
     */
    function FloorLink({
      mFloor,
      actualTpFloor,
    }: {
      mFloor: number;
      actualTpFloor?: number | null;
    }) {
      return (
        <a
          target="_self"
          href={
            actualTpFloor
              ? `#comment_${mComment.parentCommentId}_${actualTpFloor}`
              : `#${elementId}`
          }
        >
          <span className="text-primary font-semibold">#{mFloor}</span>
        </a>
      );
    }

    return (
      <div id={elementId}>
        <div className="w-full flex gap-2 items-start p-2">
          {/*左侧头像*/}
          <Avatar comment={mComment} />
          {/*右侧评论内容及信息*/}
          <div className="flex-grow flex flex-col">
            {/*昵称和时间*/}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                {floor && <FloorLink mFloor={floor} />}
                <a href={mComment.site ?? undefined} target="_blank">
                  <p id={`comment_${mComment.commentId}`} className="text-sm text-foreground">
                    {mComment.displayName}
                  </p>
                </a>
              </div>
              <div className="text-sm text-default-500 flex gap-2">
                <TimeFormatLabel time={stringToNumber(mComment.createTime)} />
                <div
                  className={clsx('cursor-pointer', {
                    'text-primary': showAddComment,
                  })}
                  onClick={() => setShowAddComment(!showAddComment)}
                >
                  {post.allowComment && <AddCommentIcon className="size-5" />}
                </div>
              </div>
            </div>

            {/*评论内容*/}
            <div className="w-full text-base text-foreground break-all flex gap-2 relative">
              {/*如果当前评论是回复的某一个评论，则显示回复楼层*/}
              {mComment.replyCommentId && (
                <Chip size="sm" className="absolute">
                  <div className="flex gap-1 items-center">
                    <ReplayIcon className="size-3" />
                    <div>
                      回复：
                      <FloorLink
                        mFloor={floorMap.get(mComment.replyCommentId)!}
                        actualTpFloor={floorMap.get(mComment.replyCommentId)!}
                      />
                    </div>
                  </div>
                </Chip>
              )}
              <div
                className={clsx({
                  'indent-[5.5rem]': mComment.replyCommentId,
                })}
              >
                {mComment.content}
              </div>
            </div>
          </div>
        </div>

        <ReplyForm
          post={post}
          showAddComment={showAddComment}
          parentCommentId={
            isChild ? mComment.parentCommentId! : comment.commentId
          }
          replyDisplayName={(floor ? `#${floor} ` : '') + mComment.displayName}
          replyCommentId={isChild ? mComment.commentId : null}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-h-fit overflow-clip flex flex-col rounded-lg hover:shadow-lg transition-all border-1 border-transparent hover:border-divider dark:hover:border-white/50">
      <Comment mComment={comment} />

      {/*子评论列表*/}
      <motion.div
        className="ml-12 overflow-hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: showChildren ? 1 : 0,
          height: showChildren ? 'auto' : 0,
        }}
      >
        {comment.children?.map((child, i) => (
          <Comment
            mComment={child}
            key={child.commentId}
            floor={comment!.children!.length - i}
            isChild
          />
        ))}
      </motion.div>

      {comment.children && comment.children.length > 0 && (
        <div
          className="pl-14 pb-2 text-default-500 text-sm flex items-center cursor-pointer select-none"
          onClick={() => setShowChildren(!showChildren)}
        >
          <p>
            {showChildren
              ? '收起回复'
              : `展开 ${comment.children.length} 条回复`}
          </p>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: showChildren ? 180 : 0 }}
          >
            <ArrowDownIcon className="size-4" />
          </motion.div>
        </div>
      )}
    </div>
  );
}
