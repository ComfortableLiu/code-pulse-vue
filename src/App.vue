<template>
  <a-app>
    <header class="header">
      <div class="menu">
        <a-menu
          mode="horizontal"
          :items="menuItems"
        />
      </div>
    </header>
    <router-view />
  </a-app>
</template>

<script setup lang="ts">
import { allRoutes } from "@/router";
import { RouterLink, RouterView } from "vue-router";
import { ref, h } from "vue";
import type { MenuProps } from "ant-design-vue";

const menuItems = ref<MenuProps['items']>(allRoutes.filter(route => route.component || route.children).map(route => {
  return {
    label: route.component ? h(RouterLink, {
      to: route.path,
    }, route.name) : route.name,
    key: route.key,
    children: (route.children || []).map(children => ({
      label: h(RouterLink, {
        to: `${route.path}${children.path}`,
      }, children.name),
      key: children.key
    }))
  }
}))
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: center;

  .menu {
    max-width: var(--page-max-width);
    flex: 1;
  }
}
</style>
