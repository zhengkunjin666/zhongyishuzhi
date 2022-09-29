<template>
  <header class="expert-header">
    <div class="header-left">
      <router-link :to="{ path: '/' }" class="index-link">
        <img
          src="@/assets/images/logo-light.png"
          alt="中国移动"
          class="index-logo"
        />
      </router-link>
    </div>
    <div class="header-right">
      <LayoutNav :subMenu="subMenu" />
    </div>
  </header>
  <main class="expert-body">
    <div class="expert-aside">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        style="width: 208px"
        mode="vertical"
        class="aside-nav"
      >
        <a-menu-item class="nav-item" key="/expert/data">
          <router-link class="nav-link" :to="{ path: '/expert/data' }">
            <svg-icon svgClass="nav-svg" svgName="iconInfo"></svg-icon>
            <span class="nav-text">专家数据</span>
          </router-link>
        </a-menu-item>
        <a-menu-item class="nav-item" key="/expert/list">
          <router-link class="nav-link" :to="{ path: '/expert/list' }">
            <svg-icon svgClass="nav-svg" svgName="iconMap"></svg-icon>
            <span class="nav-text">专家人才库</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="expert-right">
      <router-view />
    </div>
  </main>
</template>

<script setup>
import LayoutNav from "@/components/LayoutNav.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const subMenu = ref("expert-sub-menu");
const router = useRouter();
const selectedKeys = computed(() => {
  if (router.currentRoute.value.href.includes("expert/data")) {
    return ["/expert/data"];
  }
  if (router.currentRoute.value.href.includes("expert")) {
    return ["/expert/list"];
  }
  return [router.currentRoute.value.path];
});
</script>

<style lang="less" scoped>
:global(.page) {
  display: flex;
  flex-direction: column;
}
.expert-header {
  height: 72px;
  background: #fff;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  .header-left {
    margin-left: 24px;
  }
  .header-right {
    margin-left: 56px;
    .ant-menu-horizontal {
      border: none;
    }
    :deep(.ant-menu-item),
    :deep(.ant-menu-submenu) {
      height: 71px;
      line-height: 71px;
    }
  }
}
.expert-body {
  flex: 1;
  display: flex;
  .expert-aside {
    background: #fff;
    :deep(.ant-menu-vertical) {
      margin-top: 32px;
      border: none;
    };
    .nav-link {
      margin-left: 10px;
      .svg-icon {
        margin-left: 0px;
        margin-right: 13px;
      }
    }
  }
  .expert-right {
    flex: 1;
    padding: 24px;
    background: #f0f2f5;
  }
}
:global(.expert-sub-menu .ant-menu.ant-menu-sub.ant-menu-vertical) {
  min-width: 128px;
  padding: 0 4px;
}
:deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
  border-left: 2px solid;
}
:global(#app),
:global(.page) {
  height: 100%;
}
</style>
