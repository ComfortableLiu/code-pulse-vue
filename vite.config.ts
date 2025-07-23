import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import sitemapPlugin from "vite-plugin-sitemap";
import { routes } from "./src/router";

const isGithub = process.env.PUBLISH_ENV === 'github';

const list = routes.reduce<string[]>((previousValue, currentValue) => {
  const list: string[] = []
  list.push(currentValue.path);
  (currentValue.alias as [] || []).forEach(item => list.push(item))
  return [...previousValue, ...list]
}, [])

export default defineConfig({
  base: isGithub ? '/code-pulse-vue' : undefined,
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    sitemapPlugin({
      hostname: isGithub ? 'https://comfortableliu.github.io/code-pulse-vue/' : '',
      generateRobotsTxt: true,
      robots: [{
        allow: '/',
        userAgent: '*',
      }],
      dynamicRoutes: list,
    })
  ],
  build: {
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
        //
        //   // 按路由拆分
        //   if (id.includes('src/pages/')) {
        //     const pageName = id.split('src/pages/')[1].split('/');
        //     return `page-${pageName.reduce((prev, curr) => `${prev}-${curr}`, '')}`;
        //   }
        // },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
