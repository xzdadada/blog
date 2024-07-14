import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import astroExpressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import mdx from "@astrojs/mdx"
import markdownConfig from './markdown.config';

export default defineConfig({
  markdown: markdownConfig,
  integrations: [tailwind(), react(), astroExpressiveCode({
    plugins: [pluginLineNumbers()],
    styleOverrides: {
      codeBackground: '#f6f8fa',
      codeFontSize: '1rem'
    }
  }), mdx({
    ...markdownConfig,
  })]
});