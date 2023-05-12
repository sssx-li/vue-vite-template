<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="defaultActive"
    class="h-100% w-250px"
    background-color="#545c64"
    text-color="#b7bdc3"
    router
  >
    <div class="text-center p-10px">
      <el-icon :size="isCollapse ? 30 : 40">
        <i-sy-vue />
      </el-icon>
    </div>
    <MenuItem :routes="routes" v-if="routes" />
  </el-menu>
</template>

<script setup lang="ts">
import MenuItem from './menuItem.vue';

defineProps<{ isCollapse?: boolean }>();

const route = useRoute();
const router = useRouter();

const routes = computed(() =>
  router
    .getRoutes()
    .find((item) => item.name === 'layout')
    ?.children.filter((item) => !item.meta?.isHidder)
);
const defaultActive = computed(() => route.path);
</script>

<style lang="scss" scoped>
.menu-container {
  height: 100%;
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  :deep(.el-sub-menu__title) {
    background-color: #001529 !important;
  }
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
  :deep(.el-menu-item.is-active) {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.log-box {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 10px;
}
.el-menu {
  border-right: none;
}
</style>
