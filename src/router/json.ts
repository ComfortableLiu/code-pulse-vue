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
  }, {
    path: '/json2TypeScript',
    key: 'json2TypeScript',
    name: 'JSON转Typescript',
    component: () => import('@/pages/json/JsonToTypescript.vue'),
  }]
}

export default jsonRoutes
