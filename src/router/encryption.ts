import type { IRouteItem } from "@/router/type.ts";

const encryption: IRouteItem = {
  path: '/encryption',
  name: '加解密',
  key: 'encryption',
  children: [{
    path: '/sha',
    name: 'SHA加密',
    key: 'sha',
    component: () => import('@/pages/encryption/SHA.vue'),
    meta: {
      seoHead: {
        title: 'SHA加密',
        meta: [{
          name: 'description',
          content: 'SHA加密，支持SHA1、SHA256、SHA512，同时也支持HMAC-SHA1、HMAC-SHA256、HMAC-SHA512'
        }]
      }
    }
  }]
}

export default encryption
