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

const routes = computed(() => {
  function _noHidden(_routes: RouteRecordRaw[]) {
    const filterRoute: RouteRecordRaw[] = [];
    _routes.forEach((_route) => {
      if (!_route?.meta?.isHidden) {
        if (!_route.children || _route.children.length === 0) {
          filterRoute.push(_route);
        } else {
          filterRoute.push({
            ..._route,
            children: _noHidden(_route.children)! || [],
          });
        }
      }
    });
    return filterRoute;
  }
  return _noHidden(
    router.getRoutes().find((item) => item.name === 'layout')!.children
  );
});
const defaultActive = computed(() => route.path);
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
