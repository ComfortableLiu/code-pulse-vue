import type { IRouteItem } from "@/router/type.ts";

const qrcode: IRouteItem = {
  path: '/qrcode',
  name: '二维码生成',
  key: 'qrcode',
  component: () => import('@/pages/qrcode/QRCode.vue'),
  meta: {
    seoHead: {
      meta: [{
        name: 'description',
        content: '二维码生成，将任意文本内容生成二维码，并同时支持二维码边缘距离、前景颜色、背景颜色、logo、容错、渐变色的设置'
      }]
    }
  }
}

export default qrcode
