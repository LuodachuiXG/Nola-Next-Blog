import * as Crypto from 'crypto';

/**
 * 根据邮箱地址获取头像
 * QQ 邮箱默认取 QQ 头像
 * 其他邮箱取 Gravatar 头像
 * @param email 邮箱地址,可能为空(后端未返回时)
 */
export function getAvatarUrl(
  email: string | undefined | null
): string | null {
  const trimmedEmail = email?.trim().toLowerCase();

  // 没有邮箱时不取头像
  if (!trimmedEmail) {
    return null;
  }

  let avatar: string | null = null;
  if (trimmedEmail.endsWith("@qq.com")) {
    // 当前是 QQ 邮箱，设置头像地址为 QQ 头像
    // qlogo 接口的 dst_uin 只接受纯 QQ 号，需要去掉 @qq.com 后缀
    const qq = trimmedEmail.split('@')[0];
    avatar = `https://q2.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=640`
  } else {
    // 取 Gravatar 头像（https://weavatar.com 也会读取 QQ 头像，但是这里先暂时自己处理 QQ 头像）
    const hash = Crypto.createHash('md5').update(trimmedEmail).digest("hex")
    avatar = `https://weavatar.com/avatar/${hash}?s=${100}&d=monsterid`
  }

  return avatar
}
