<template>
  <!-- 首次访问的欢迎模块 -->
  <first-visit-welcome
    style="margin-top: 48px"
  />
  <!-- 主要功能区域 -->
  <div
    v-if="recentRouteHistoryList?.length || frequentRouteHistoryList?.length"
    class="main-feature-area"
  >
    <!-- 最近使用模块 -->
    <div
      v-if="recentRouteHistoryList?.length"
      class="base-component recently-used"
    >
      <h2 class="title">最近使用</h2>
      <div class="content-area">
        <router-link
          v-for="item in recentRouteHistoryList"
          :key="item.path"
          :to="item.path"
        >
          <a-button
            class="btn"
            type="default"
          >
            {{ item.name }}
          </a-button>
        </router-link>
      </div>
    </div>
    <!-- 高频使用模块 -->
    <div
      v-if="frequentRouteHistoryList?.length"
      class="base-component recently-used"
    >
      <h2 class="title">最常用</h2>
      <div class="content-area">
        <router-link
          v-for="item in frequentRouteHistoryList"
          :key="item.route.name"
          :to="item.route.path"
        >
          <a-button
            class="btn"
            type="primary"
          >
            {{ item.route.name }}
          </a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import {
  FREQUENT_ROUTES_KEY,
  getFrequentRouteHistory,
  getRecentRouteHistory,
  type IRouteFrequencyRecordList,
  RECENT_VISITS_KEY
} from "@/utils/router.ts";
import type { RouteLocationNormalized } from "vue-router";
import FirstVisitWelcome from "@/components/FirstVisitWelcome.vue";
import ContactMe from "@/components/ContactMe.vue";

// 高频路由数量
const FREQUENT_ROUTE_HISTORY_NUM = 10;
// 最近访问路由数量
const RECENT_ROUTE_HISTORY_NUM = 10;

// 最近访问路由列表
const recentRouteHistoryList = ref<RouteLocationNormalized[]>()
// 高频访问路由列表
const frequentRouteHistoryList = ref<IRouteFrequencyRecordList>()

// Localstorage变化监听函数
function handleStorageChange(e?: StorageEvent) {
  if (e && ![RECENT_VISITS_KEY, FREQUENT_ROUTES_KEY].includes(e.key || '')) return
  recentRouteHistoryList.value = getRecentRouteHistory(RECENT_ROUTE_HISTORY_NUM)
  frequentRouteHistoryList.value = getFrequentRouteHistory(FREQUENT_ROUTE_HISTORY_NUM)
}

onMounted(() => {
  if (!import.meta.env.SSR) {
    window.addEventListener("storage", handleStorageChange)
  }
  handleStorageChange()
})

onUnmounted(() => {
  if (!import.meta.env.SSR) {
    window.removeEventListener("storage", handleStorageChange)
  }
})
</script>

<style scoped>

.main-feature-area {
  display: flex;
  margin-top: 48px;
  flex-direction: column;
  gap: 28px;

  .base-component {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 22px;
    }

    .content-area {
      display: flex;
      flex-direction: row;
      gap: 12px;

      .btn {
        height: 58px;
      }
    }
  }
}

hr {
  margin: 54px 0;
}
</style>
