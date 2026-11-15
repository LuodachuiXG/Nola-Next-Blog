const API_TIMEOUT_MS = 10000;

/**
 * 读取后端 API 基础地址
 * 缺失时直接报错,避免拼出 "undefined/api/..." 的请求
 */
export function getServerUrl(): string {
  const serverUrl = process.env.SERVER_URL;
  if (!serverUrl) {
    throw new Error(
      '缺少环境变量 SERVER_URL,请在 .env.development / .env.production 中配置后端 API 地址'
    );
  }
  return serverUrl;
}

/**
 * 统一的后端 API 请求封装
 * - 自动拼接 SERVER_URL 基础地址
 * - 10 秒超时,避免后端挂起导致渲染挂起
 * - HTTP 错误状态会尝试透传后端的错误 JSON(如带 errMsg 的 ApiResponse),
 *   与旧行为保持一致;只有响应体不是合法 JSON 时才抛出带路径信息的错误
 *
 * @param path 以 / 开头的接口路径(可带 query string)
 * @param init fetch 的额外参数(POST 的 body、headers 等)
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(getServerUrl() + path, {
    ...init,
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });

  try {
    return (await res.json()) as T;
  } catch {
    throw new Error(
      `后端响应异常:${res.status} ${res.statusText},且响应体不是合法 JSON(${path})`
    );
  }
}
