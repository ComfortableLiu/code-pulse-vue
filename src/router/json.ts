import type { IRouteItem } from "@/router/type.ts";

const jsonRoutes: IRouteItem = {
  name: 'JSON',
  key: 'json',
  path: '/json',
  children: [{
    path: '/format',
    key: 'format',
    name: 'JSON格式化',
    component: () => import('@/pages/json/JsonFormat.vue'),
  }]
}

export default jsonRoutes
