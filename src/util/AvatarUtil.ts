import * as Crypto from 'crypto';

/**
 * 根据邮箱地址获取头像
 * QQ 邮箱默认取 QQ 头像
 * 其他邮箱取 Gravatar 头像
 * @param email
 */
export function getAvatarUrl(
  email: string
): string | null {
  let avatar: string | null = null;
  if (email.endsWith("@qq.com")) {
    // 当前是 QQ 邮箱，设置头像地址为 QQ 头像
    avatar = `https://q2.qlogo.cn/headimg_dl?dst_uin=${email}&spec=640`
  } else {
    // 取 Gravatar 头像（https://weavatar.com 也会读取 QQ 头像，但是这里先暂时自己处理 QQ 头像）
    const hash = Crypto.createHash('md5').update(email.trim().toLowerCase()).digest("hex")
    avatar = `https://weavatar.com/avatar/${hash}?s=${100}&d=monsterid`
  }

  return avatar
}