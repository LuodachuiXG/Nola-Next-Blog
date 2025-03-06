import { Comment } from '@/models/Comment';
import { stringToNumber } from '@/util/NumberUtil';
import TimeFormatLabel from '@/ui/component/TimeFormatLabel';

/**
 * 评论项
 * @param comment 评论接口
 */
export default function CommentItem({ comment }: { comment: Comment }) {
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
    <div className="w-full flex gap-2 items-start rounded-xl p-2 hover:shadow-lg transition-all border-1 border-transparent hover:border-divider hover:-translate-y-0.5 dark:hover:border-white/50">
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
          <p className="text-sm text-default-500">
            <TimeFormatLabel time={stringToNumber(comment.createTime)} />
          </p>
        </div>

        {/*评论内容*/}
        <div className="w-full text-base text-foreground break-all">
          {comment.content}
        </div>
      </div>
    </div>
  );
}
