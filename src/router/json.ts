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
    meta: {
      seoHead: {
        meta: [{
          name: 'description',
          content: 'JSON格式化，将JSON格式的字符串格式化为可读的格式'
        }]
      }
    }
  }, {
    path: '/json2TypeScript',
    key: 'json2TypeScript',
    name: 'JSON转Typescript',
    component: () => import('@/pages/json/JsonToTypescript.vue'),
    meta: {
      seoHead: {
        meta: [{
          name: 'description',
          content: '将JSON格式的字符串转换为Typescript类型定义'
        }]
      }
    }
  }]
}

export default jsonRoutes
