import type { RouteLocationNormalized } from "vue-router";
import { Localstorage } from "@/utils/storage.ts";
import { flatRoutes } from "@/router";

// 基础key
export const ROUTE_HISTORY_KEY = 'code-pulse-route-'
// 最近访问记录key
export const RECENT_VISITS_KEY = ROUTE_HISTORY_KEY + 'recent-visits'
// 高频路由记录key
export const FREQUENT_ROUTES_KEY = ROUTE_HISTORY_KEY + 'frequent-routes'

// 不记录历史的路由黑名单
const routeBlackList = [
  '/',
  '/login',
  '/404',
  '/401',
  '/500',
  '/about',
  '/about-us',
  '/about-us/contact-us',
]

/**
 * 检查是否是黑名单路由
 */
function checkIsRouteBlackList(route: RouteLocationNormalized) {
  return routeBlackList.includes(route.path)
}

/**
 * 检查是否是内部拥有的路由
 */
function checkIsInternalRoute(route: RouteLocationNormalized) {
  return !!flatRoutes.get(route.path)
}

/**
 * 检查路由合法性，包括黑名单检查和内部路由检查
 */
function checkRouteValidity(route: RouteLocationNormalized) {
  return !checkIsRouteBlackList(route) && checkIsInternalRoute(route)
}

/**
 * 维护路由历史访问记录
 */
export function manageRouteHistory(to: RouteLocationNormalized) {
  if (!checkRouteValidity(to)) return
  const list = Localstorage.get<RouteLocationNormalized[]>(RECENT_VISITS_KEY) || []
  // 找一下是不是已经有记录了
  const index = list.findIndex(item => item.path === to.path)
  if (index < 0) {
    // 如果没有记录，那就放到最开头
    list.unshift(to)
  } else {
    // 如果已经有记录了，那就提升到最开头
    const [matchedRoute] = list.splice(index, 1);
    list.unshift(matchedRoute);
  }
  Localstorage.set(RECENT_VISITS_KEY, list)
}

/**
 * 获取最近n个路由历史访问记录
 */
export function getRecentRouteHistory(n: number): RouteLocationNormalized[] {
  const list = Localstorage.get<RouteLocationNormalized[]>(RECENT_VISITS_KEY) || []
  return list.slice(0, n)
}

/**
 * 路由高频记录结构
 */
export interface IRouteFrequencyRecord {
  route: RouteLocationNormalized;
  count: number
}

export type IRouteFrequencyRecordList = IRouteFrequencyRecord[]

/**
 * 维护路由高频历史访问记录，需要设置一个最高频率，不然会出现一个极值访问把其他功能挤得上不来
 */
export function maintainFrequentRouteHistory(to: RouteLocationNormalized) {
  if (!checkRouteValidity(to)) return
  const MAX_FREQUENT_ROUTES = 10; // 设置最大频率
  const list = Localstorage.get<IRouteFrequencyRecordList>(FREQUENT_ROUTES_KEY) || [];

  const index = list.findIndex(item => item.route.path === to.path);

  if (index < 0) {
    const obj = { route: to, count: 1 }
    const index = list.findIndex(item => item.count === 1)
    if (index >= 0) {
      list.splice(index, 0, obj)
    } else {
      list.push(obj)
    }
  } else {
    list[index].count++
    if (list[index].count > MAX_FREQUENT_ROUTES) {
      list[index].count = MAX_FREQUENT_ROUTES
    }
    const current = list[index];
    // 从当前位置向前查找，找到第一个 count > current.count 的位置
    let targetIndex = index - 1;
    while (targetIndex >= 0 && list[targetIndex].count <= current.count) {
      targetIndex--;
    }
    // 删除当前元素
    list.splice(index, 1);
    // 插入到目标位置后
    list.splice(targetIndex + 1, 0, current);
  }
  Localstorage.set(FREQUENT_ROUTES_KEY, list);
}

/**
 * 获取前n个高频路由记录
 */
export function getFrequentRouteHistory(n: number): IRouteFrequencyRecordList {
  const list = Localstorage.get<IRouteFrequencyRecordList>(FREQUENT_ROUTES_KEY) || []
  return list.slice(0, n);
}
