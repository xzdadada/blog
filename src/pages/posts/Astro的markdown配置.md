---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Astro 的 markdown 配置教程'
pubDate: 2024-07-01
description: '在 Astro 中更好地展示 markdown，支持 mermaid、TOC、代码行数等特性'
tags: ["Astro"]
---
## 使用 TOC

安装依赖

```bash
npm i rehype-slug rehype-toc rehype-autolink-headings rehype-stringify remark-toc
```

配置 markdown.config.ts

```ts
import remarkToc from "remark-toc";
import rehypeToc from "rehype-toc";
import remarkMermaid from "remark-mermaidjs";
import rehypeSlug from "rehype-slug";
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
export default {
    remarkPlugins: [[remarkToc, { tight: true, ordered: true }]],
    rehypePlugins: [
        rehypeHeadingIds,
        rehypeSlug,
        [
            rehypeToc,
            {
                headings: ["h1", "h2", "h3"],
                cssClasses: {
                    toc: "toc-post",
                    link: "toc-link",
                },
            },
        ],
    ],
};
```

配置 astro.config.js

```
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx"
import markdownConfig from './markdown.config';

export default defineConfig({
  markdown: markdownConfig,
  integrations: [mdx({
    ...markdownConfig,
  })]
});
```

## 美化 markdown 代码块

安装依赖

```bash
npm i astro-expressive-code
```

配置 `astro.config.js`

```js
export default defineConfig({
  integrations: [tailwind(), react(), astroExpressiveCode()]
});
```

自定义配置：在 `astroExpressiveCode` 中进行配置，参考 https://expressive-code.com/reference/style-overrides/

```js
export default defineConfig({
  integrations: [tailwind(), react(), astroExpressiveCode({
    styleOverrides: {
      codeBackground: '#f6f8fa',
      codeFontSize: '1rem'
    }
  })]
});
```

> 为防止与设置的行内 code 样式干扰，可以使用 css :not 选择器，排除 .expressive-code

设置代码行数

```js
npm i @expressive-code/plugin-line-numbers
```

```js
import { defineConfig } from 'astro/config'
import astroExpressiveCode from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

export default defineConfig({
  integrations: [
    astroExpressiveCode({
      plugins: [pluginLineNumbers()],
    }),
  ],
})
```

