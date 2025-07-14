import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Homepage from '../pages/homepage/index.vue'
import encryptionRoutes from "@/router/encryption.ts";
import jsonRoutes from "@/router/json.tsx";
import encodingRoutes from "@/router/encoding.ts";
import type { IRouteItem } from "@/router/type.ts";

const homepageRoutes: IRouteItem = {
  path: '/',
  name: 'Homepage',
  key: 'homepage',
  component: Homepage,
}

export const allRoutes = [
  homepageRoutes,
  encryptionRoutes,
  jsonRoutes,
  encodingRoutes,
]

// 扁平化路由，用来注册用，实际业务中是需要有父子路由的，所以这个实际业务中没有用
const routes: Readonly<RouteRecordRaw[]> = allRoutes.reduce<RouteRecordRaw[]>((previousValue, currentValue) => {
  const list: RouteRecordRaw[] = []
  if (currentValue.component) {
    list.push({
      path: currentValue.path,
      component: currentValue.component,
      name: currentValue.name,
    })
  }
  if (currentValue.children) {
    currentValue.children.forEach((route) => {
      if (!route.component) return
      list.push({
        path: `${currentValue.path || ''}${route.path}`,
        component: route.component,
        name: route.name,
      })
    })
  }
  return [...previousValue, ...list]
}, [])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
