import remarkToc from "remark-toc";
import rehypeToc from "rehype-toc";
import remarkMermaid from "remark-mermaidjs";
import rehypeSlug from "rehype-slug";
import { rehypeHeadingIds } from '@astrojs/markdown-remark'
export default {
    remarkPlugins: [
        remarkMermaid, [remarkToc, { tight: true, ordered: true }]
    ],
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