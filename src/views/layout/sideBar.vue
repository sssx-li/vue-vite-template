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
.el-menu {
  border-right: none;
}
</style>
