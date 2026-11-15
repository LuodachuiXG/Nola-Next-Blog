# Nola Next

基于 Next.js 16(App Router)+ React 19 + HeroUI 2.x + Tailwind CSS v4 的个人博客前端,配合 Nola 后端服务使用。

## 环境要求

- Node.js >= 20.9
- npm

## 环境变量

复制并修改以下文件(不入库):

| 文件 | 变量 | 说明 |
| --- | --- | --- |
| `.env.development` / `.env.production` | `SERVER_URL` | 后端 REST API 地址,服务端渲染时读取(必填,缺失会直接报错) |
| `.env.development` / `.env.production` | `NEXT_PUBLIC_SERVER_URL` | 与 SERVER_URL 相同,客户端组件拼接图片相对路径时使用;不配则图片回退到 localhost:8098 |
| `.env.development` / `.env.production` | `NEXT_PUBLIC_WEBSOCKET_URL` | 在线人数 WebSocket 地址(可空,缺失时在线人数不显示) |

## 开发与构建

```bash
npm install          # 安装依赖
npm run dev          # 开发服务器(默认 3000 端口)
npm run build        # 生产构建
npm run start        # 生产启动,端口 3002
npm run lint         # ESLint 检查
```

## 目录结构

```
src/
├── app/                 # 路由与页面,feature 组件就近放在各自目录的 _components/
├── components/          # 通用组件(Navbar、Sidebar、Footer 等)
├── api/                 # 后端 API 封装(统一走 apiFetch,带超时和错误处理)
├── models/              # 数据模型
├── hooks/  util/  lib/
```

## 主要功能

- 文章列表 / 详情(目录、代码高亮、评论)
- 日记、分类、标签、友情链接
- 明暗主题切换、在线人数、Gravatar / QQ 头像

## 技术备注

- markdown 渲染使用 marked + DOMPurify 消毒,防存储型 XSS
- `npm audit` 保持 0 漏洞;`overrides` 里的 deepmerge/minimatch 为审计修复,上游修复后可移除
