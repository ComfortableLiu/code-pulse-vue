import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import sitemapPlugin from "vite-plugin-sitemap";
import { routes } from "./src/router";
import { viteExternalsPlugin } from "vite-plugin-externals";
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

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
      hostname: isGithub ? 'https://comfortableliu.github.io/code-pulse-vue/' : 'https://code-pulse.cn/',
      generateRobotsTxt: true,
      robots: [{
        allow: '/',
        userAgent: '*',
      }],
      dynamicRoutes: list,
    }),
    {
      name: 'cdn-inject',
      transformIndexHtml(html) {
        return html.replace(
          '</head>',
          `
<script src="https://cdn.jsdelivr.net/npm/vue@3.5.17/dist/vue.global.prod.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-router@4.5.1/dist/vue-router.global.prod.min.js"></script>
</head>`
        )
      }
    },
    viteExternalsPlugin({
      // 格式：{ 包名: 全局变量名 }
      vue: 'Vue',
      'vue-router': 'VueRouter',
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
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
