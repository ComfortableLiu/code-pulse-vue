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
  }]
}

export default encryption
