import type { IRouteItem } from "@/router/type.ts";

const qrcode: IRouteItem = {
  path: '/qrcode',
  name: '二维码生成',
  key: 'qrcode',
  component: () => import('@/pages/qrcode/QRCode.vue'),
}

export default qrcode
