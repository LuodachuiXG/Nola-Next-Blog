// 'use client';
//
// /**
//  * 文章目录组件
//  * @param containerId 文章容器 ID
//  */
// export default function PostCatalog({ containerId }: { containerId: string }) {}
//
// /**
//  * 生成文章目录
//  * @param containerId
//  */
// function generatePostCatalog(containerId: string) {
//   // 获取article元素
//   const article = document.getElementById(containerId);
//
//   if (!article) return null;
//
//   // 收集所有的标题标签
//   const headers = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
//
//   // 创建目录结构
//   const tocContainer = document.createElement('div');
//   tocContainer.className = 'toc-container';
//
//   // 创建根ul
//   const rootUl = document.createElement('ul');
//   tocContainer.appendChild(rootUl);
//
//   // 栈用于跟踪当前层级，每个元素包含层级和ul
//   const stack = [{ level: 0, ul: rootUl }];
//
//   headers.forEach((header) => {
//     const level = parseInt(header.tagName.match(/\d+/)[0], 10);
//
//     // 调整栈，确保当前层级正确
//     while (stack.length > 1 && level <= stack[stack.length - 1].level) {
//       stack.pop();
//     }
//
//     const currentUl = stack[stack.length - 1].ul;
//
//     // 创建新的列表项
//     const li = document.createElement('li');
//     const textNode = document.createTextNode(header.textContent ?? '');
//     li.appendChild(textNode);
//
//     // 确定是否需要创建子ul
//     if (level > stack[stack.length - 1].level) {
//       const newUl = document.createElement('ul');
//       li.appendChild(newUl);
//       stack.push({ level, ul: newUl });
//     } else {
//       // 当前li添加到当前ul
//     }
//
//     currentUl.appendChild(li);
//   });
//
//   // 将目录容器插入到article之前或者其它位置
//   article.before(tocContainer);
// }
