import { type RouteRecordRaw } from 'vue-router'
import encryptionRoutes from "../router/encryption.ts";
import jsonRoutes from "../router/json.ts";
import encodingRoutes from "../router/encoding.ts";
import aboutRoutes from "../router/about.ts";
import qrcodeRoutes from "../router/qr-code.ts";
import type { IRouteItem } from "./type";

const homepageRoutes: IRouteItem = {
  path: '/',
  name: '首页',
  key: 'homepage',
  alias: ['/home', '/index', '/homepage'],
  component: () => import('@/pages/homepage/HomePage.vue'),
  meta: {
    seoHead: {
      meta: [{
        name: 'description',
        content: '本站致力于为广大开发者提供一系列实用的小工具，帮助大家提升开发效率、简化日常工作流程。'
      }]
    }
  }
}

export const allRoutes = [
  homepageRoutes,
  jsonRoutes,
  encryptionRoutes,
  encodingRoutes,
  qrcodeRoutes,
  aboutRoutes,
]

// 用来做path=>item的映射的，同时包括一级和二级菜单
export const allRoutesMap: Map<string, IRouteItem> = allRoutes.reduce((previousValue, currentValue) => {
  previousValue.set(currentValue.path, currentValue)
  if (currentValue.children) {
    currentValue.children.forEach((route) => {
      if (!route.component) return
      previousValue.set(`${currentValue.path || ''}${route.path}`, route)
    })
  }
  return previousValue
}, new Map<string, IRouteItem>())

// 功能同上，但是只包括带页面的路由
export const flatRoutes = allRoutes.reduce((previousValue, currentValue) => {
  if (currentValue.component) {
    previousValue.set(currentValue.path, currentValue)
  }
  if (currentValue.children) {
    currentValue.children.forEach((route) => {
      if (!route.component) return
      previousValue.set(`${currentValue.path || ''}${route.path}`, route)
    })
  }
  return previousValue
}, new Map<string, IRouteItem>())

// 扁平化路由，用来注册用，实际业务中是需要有父子路由的，所以这个实际业务中没有用
export const routes: Readonly<RouteRecordRaw[]> = allRoutes.reduce<RouteRecordRaw[]>((previousValue, currentValue) => {
  const list: RouteRecordRaw[] = []
  if (currentValue.component) {
    const alias = [...(currentValue.alias || [])].reduce<string[]>((p, c) => {
      const l = [...p, c,]
      if (c !== '/') {
        l.push(`${c}.html`)
      }
      return l
    }, [])
    if (currentValue.path !== '/') {
      alias.push(`${currentValue.path}.html`)
    }
    list.push({
      path: currentValue.path,
      component: currentValue.component,
      name: currentValue.name,
      alias,
    })
  }
  if (currentValue.children) {
    currentValue.children.forEach((route) => {
      if (!route.component) return
      const path = `${currentValue.path || ''}${route.path}`
      list.push({
        path,
        component: route.component,
        name: route.name,
        alias: [...(route.alias || []), path + '.html'],
      })
    })
  }
  return [...previousValue, ...list]
}, [])
