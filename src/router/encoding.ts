import Base64 from '../pages/encoding/Base64.vue'
import URL from '../pages/encoding/URL.vue'
import type { IRouteItem } from "@/router/type.ts";

const encryption: IRouteItem = {
  path: '/encoding',
  name: '编码',
  key: 'encoding',
  children: [{
    path: '/base64',
    name: 'Base64编码',
    component: Base64,
    key: 'base64',
  },{
    path: '/url',
    name: 'URL编码',
    component: URL,
    key: 'url',
  }]
}

export default encryption
