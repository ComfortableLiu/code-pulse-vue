import type { Component } from "vue";

export interface IRouteItem {
  path: `/${string}`,
  key: string,
  name: string,
  component?: Component,
  children?: IRouteItem[]
}
