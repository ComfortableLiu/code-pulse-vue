import App from "@/App.vue";
import { allRoutesMap, routes } from "@/router";
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import './assets/main.css'
import '@icon-park/vue-next/styles/index.css';
import { createHead, useHead, type UseHeadInput } from "@vueuse/head";
import type { IRouteItem } from "@/router/type.ts";
import { ViteSSG } from "vite-ssg";
import { maintainFrequentRouteHistory, manageRouteHistory } from "@/utils/router.ts";

// const app = createApp(App)
// app.use(router)
// app.use(Antd)
// // SEO
// app.use(createHead())
// app.mount('#app')
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  ({ app, router }) => {
    app.use(Antd)
    app.use(createHead())

    function handleHead(route: IRouteItem): UseHeadInput {
      const routeMeta = route?.meta?.seoHead
      if (!routeMeta) {
        return {
          title: `Code Pulse - ${route.name}`,
        }
      }
      return {
        ...routeMeta,
        title: routeMeta.title || `Code Pulse - ${route.name}`
      }
    }

    // 监听路由变化，记录历史访问记录
    router.afterEach((to, from, failure) => {
      if (failure) return
      // 维护最近历史记录
      manageRouteHistory(to)
      // 维护高频路由历史记录
      maintainFrequentRouteHistory(to)
      // SEO，动态设置元标签
      useHead(handleHead(allRoutesMap.get(to.path)!))
    })

    // 处理.html后缀路由
    // router.beforeEach((to, from, next) => {
    //   if (to.path.endsWith('.html')) {
    //     next(to.path.replace(/\.html$/, ''))
    //   } else {
    //     next()
    //   }
    // })
  },
)
