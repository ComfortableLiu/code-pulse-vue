import type { IRouteItem } from "@/router/type.ts";

const encryption: IRouteItem = {
  path: '/encoding',
  name: '编码',
  key: 'encoding',
  children: [{
    path: '/base64',
    name: 'Base64编码',
    component: () => import('@/pages/encoding/Base64.vue'),
    key: 'base64',
    meta: {
      seoHead: {
        meta: [{
          name: 'description',
          content: 'Base64编码与解码'
        }]
      }
    }
  }, {
    path: '/url',
    name: 'URL编码',
    component: () => import('@/pages/encoding/URL.vue'),
    key: 'url',
    meta: {
      seoHead: {
        meta: [{
          name: 'description',
          content: '进行URL编码与解码'
        }]
      }
    }
  }]
}

export default encryption
