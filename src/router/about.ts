import type { IRouteItem } from "@/router/type.ts";

const about: IRouteItem = {
  path: '/about',
  name: '关于我们',
  key: 'about',
  component: () => import('@/pages/about/AboutUs.vue'),
  meta: {
    seoHead: {
      meta: [{
        name: 'description',
        content: 'Code Pulse 致力于为广大开发者提供一系列实用的小工具，帮助大家提升开发效率、简化日常工作流程。'
      }]
    }
  }
}

export default about
