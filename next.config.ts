import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import rehypeSlug from 'rehype-slug';

const nextConfig: NextConfig = {
  /* config options here */
  /* 开启后导出静态 HTML 文件 */
  // output: "export"
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  // options: {
  //   remarkPlugins: [],
  //   rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
  // },
});

export default withMDX(nextConfig);
