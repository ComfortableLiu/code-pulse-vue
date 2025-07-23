<template>
  <a-config-provider :theme="{ token: { colorPrimary: '#2196F3' } }">
    <a-app>
      <header class="header">
        <div class="menu">
          <!-- 一级菜单 -->
          <div class="menu-first">
            <div class="content">
              <a-dropdown
                v-for="route in allRoutes"
                :key="route.key"
              >
                <router-link
                  :to="route.children? `${route.path}${route.children[0].path}` : route.path"
                  v-bind:class="{active: selectedFirstMenu?.key===route.key}"
                >
                  {{ route.name }}
                </router-link>

                <template v-if="route.children?.length" #overlay>
                  <a-menu>
                    <a-menu-item
                      v-for="children in route.children"
                      :key="children.key"
                    >
                      <router-link
                        :to="`${route.path||''}${children.path}`"
                        v-bind:class="{active: selectedFirstMenu?.key===route.key}"
                      >
                        {{ children.name }}
                      </router-link>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>

          <!-- 二级菜单 -->
          <div
            class="menu-second"
            v-show="selectedFirstMenu?.children"
          >
            <div class="content">
              <router-link
                v-for="route in (selectedFirstMenu?.children || [])"
                :to="`${selectedFirstMenu?.path || ''}${route.path}`"
                :key="route.key"
                v-bind:class="{active: selectedSecondMenu?.key === route.key}"
              >
                {{ route.name }}
              </router-link>
            </div>
          </div>
        </div>
      </header>
      <div id="app-router-view">
        <router-view />
      </div>
    </a-app>
  </a-config-provider>
</template>

<script setup lang="ts">
import { allRoutes, allRoutesMap } from "@/router";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute()

// 现在选择的一级菜单
const selectedFirstMenu = computed(() => allRoutesMap.get(`/${route.path.split('/')[1]}`))
// 现在选择的二级菜单
const selectedSecondMenu = computed(() => allRoutesMap.get(route.path))

</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: center;

  .menu {
    width: 100%;

    .content {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      justify-content: flex-start;
      max-width: var(--page-max-width);
      align-items: center;

      * a {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 12px;
      }
    }

    .menu-first {
      display: flex;
      height: 46px;
      width: 100%;
      background-color: #000000;
      justify-content: center;

      * a {
        color: #FFFFFF;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 12px;

        &:hover {
          color: #CCCCCC;
        }

        &.active {
          background-color: #333;
        }
      }
    }

    .menu-second {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      height: 50px;
      border-bottom: 1px solid #EEEEEE;
      box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);

      a.active {
        background-color: #F1F1F1;
      }
    }
  }
}

#app-router-view {
  display: flex;
  max-width: var(--page-max-width);
  flex-direction: column;
  margin: 22px auto;
}
</style>
