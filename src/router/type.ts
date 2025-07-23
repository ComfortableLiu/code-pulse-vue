import type { Component } from "vue";
import type { UseHeadInput } from "@vueuse/head";

export interface IRouteItem {
  path: `/${string}`,
  alias?: `/${string}`[]
  key: string,
  name: string,
  component?: Component,
  children?: IRouteItem[]
  meta?: {
    isHidden?: boolean;
    // 为了SEO，只好委屈你了，所有页面必须要写一个描述
    seoHead: UseHeadInput;
  }
}
