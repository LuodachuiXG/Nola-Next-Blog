'use client';

import { useState } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { motion } from 'motion/react';
import { Locked as LockedIcon } from '@ricons/carbon';
import { Post } from '@/models/Post';
import { PostContent } from '@/models/PostContent';
import { apiPostGetPostContentPost } from '@/api/apiPost';
import PostContentView from './PostContentView';

/**
 * 加密文章闸门组件
 * 加密文章不在服务端请求正文，由用户在客户端输入密码解锁后才渲染正文
 * @param id 文章 ID（文章 ID 和文章别名至少提供一个）
 * @param slug 文章别名（文章 ID 和文章别名至少提供一个）
 * @param post 文章信息
 */
export default function PostContentGate(props: {
  id?: number;
  slug?: string;
  post: Post;
}) {
  const { id, slug } = props;

  // 输入的文章密码
  const [password, setPassword] = useState('');
  // 是否正在解锁
  const [isUnlocking, setIsUnlocking] = useState(false);
  // 解锁失败的错误信息（含后端返回的 errMsg）
  const [errMsg, setErrMsg] = useState<string | null>(null);
  // 解锁成功后的文章内容（null 表示尚未解锁）
  const [postContent, setPostContent] = useState<PostContent | null>(null);

  /**
   * 解锁加密文章
   */
  const unlock = async () => {
    const pwd = password.trim();
    if (!pwd) {
      setErrMsg('请输入文章密码');
      return;
    }

    setIsUnlocking(true);
    setErrMsg(null);

    try {
      const res = await apiPostGetPostContentPost(id, slug, pwd);
      if (res.data) {
        // 解锁成功，渲染正文
        setPostContent(res.data);
      } else {
        // 密码错误等情况，展示后端错误信息
        setErrMsg(res.errMsg ?? '解锁失败，请稍后重试');
      }
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : '网络异常，请稍后重试');
    } finally {
      setIsUnlocking(false);
    }
  };

  // 已解锁，渲染与正常文章完全相同的正文
  if (postContent) {
    return <PostContentView content={postContent.content} />;
  }

  return (
    <motion.div
      className="w-full flex flex-col items-center gap-3 px-6 py-20"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/*锁图标*/}
      <motion.div
        className="bg-content2 rounded-full p-4"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', bounce: 0.5 }}
      >
        <LockedIcon className="size-8 text-default-500" />
      </motion.div>

      {/*标题和提示*/}
      <p className="text-xl font-semibold text-foreground">本文已加密</p>
      <p className="text-sm text-default-500">
        该文章受密码保护，输入正确密码后阅读全文
      </p>

      {/*密码输入和解锁按钮*/}
      <form
        className="w-full max-w-72 flex flex-col gap-3 mt-2"
        onSubmit={(e) => {
          // 阻止表单默认跳转，走 AJAX 解锁
          e.preventDefault();
          unlock();
        }}
      >
        <Input
          type="password"
          label="文章密码"
          placeholder="请输入密码"
          aria-label="文章密码"
          value={password}
          onValueChange={setPassword}
          isInvalid={!!errMsg}
        />
        {/*解锁失败的错误信息*/}
        {errMsg && <p className="text-sm text-danger">{errMsg}</p>}
        <Button color="primary" type="submit" isLoading={isUnlocking} fullWidth>
          {isUnlocking ? '解锁中' : '解锁'}
        </Button>
      </form>
    </motion.div>
  );
}
