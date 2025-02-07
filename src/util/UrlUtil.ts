/**
 * 获取图片真实地址
 * 如果图片是绝对地址则直接返回，如果是相对地址，则加上服务器地址
 * @param imgUrl
 */
export function getImageRealUrl(imgUrl: string | undefined | null): string {
  if (!imgUrl) return '';
  if (imgUrl.startsWith('http')) {
    // 绝对地址，直接返回
    return imgUrl;
  } else {
    // 相对地址
    const serverUrl = process.env.SERVER_URL;
    if (imgUrl.startsWith('/')) {
      return serverUrl + imgUrl;
    } else {
      return serverUrl + '/' + imgUrl;
    }
  }
}
