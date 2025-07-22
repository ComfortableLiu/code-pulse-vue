import type { IRouteItem } from "@/router/type.ts";

const about: IRouteItem = {
  path: '/about',
  name: '关于我们',
  key: 'about',
  component: () => import('@/pages/about/AboutUs.vue'),
}

export default about
