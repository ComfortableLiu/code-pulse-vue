<template>
  <a-config-provider :theme="{ token: { colorPrimary: '#2196F3' } }">
    <a-app id="app-main-style">
      <a-layout-header class="header">
        <menu-view />
      </a-layout-header>
      <a-layout-content id="app-router-view">
        <router-view />
      </a-layout-content>
      <a-layout-footer>
        <footer-view />
      </a-layout-footer>
    </a-app>
  </a-config-provider>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import MenuView from "@/components/MenuView.vue";
import FooterView from "@/components/FooterView.vue";
</script>

<style scoped>
#app-main-style {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.header {
  width: 100%;
  display: flex;
  justify-content: center;

}

#app-router-view {
  display: flex;
  max-width: var(--page-max-width);
  flex-direction: column;
  margin: 22px auto;
  flex: 1;
  width: 100%;
}
</style>
