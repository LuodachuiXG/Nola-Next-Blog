/**
 * 获取图片真实地址
 * 如果图片是绝对地址则直接返回，如果是相对地址，则加上服务器地址
 * @param imgUrl
 */
export function getImageRealUrl(imgUrl: string | undefined | null): string | undefined {
  if (!imgUrl) return undefined;
  if (imgUrl.startsWith('http')) {
    // 绝对地址，直接返回
    return imgUrl;
  } else {
    // 相对地址
    // 这里的 http://localhost:8098 是为了在开发时本地调试可以正确显示图片，因为在 client 组件中调用此方法，是拿不到 SERVER_URL 的
    const serverUrl = process.env.SERVER_URL ?? 'http://localhost:8098';
    if (imgUrl.startsWith('/')) {
      return serverUrl + imgUrl;
    } else {
      return serverUrl + '/' + imgUrl;
    }
  }
}
