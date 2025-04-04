'use client'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.min.css'
import { useEffect } from 'react';

/**
 * 文章代码高亮组件
 * @constructor
 */
export default function PostCodeHighlight() {

  useEffect(() => {
    if (document) {
      hljs.highlightAll()
    }
  }, []);

  return null
}