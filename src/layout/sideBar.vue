<template>
  <a-menu
    v-model:openKeys="menuState.openKeys"
    v-model:selectedKeys="menuState.selectedKeys"
    class="h-100% w-250px"
    mode="inline"
    @click="handleClickMenu"
  >
    <div class="text-center p-10px">
      <svg-icon name="vue" class="text-30px"></svg-icon>
    </div>
    <MenuItem :routes="routes" v-if="routes" />
  </a-menu>
</template>

<script setup lang="ts">
import { MenuProps } from 'ant-design-vue/es';
import MenuItem from './menuItem.vue';

const props = defineProps<{ isCollapse?: boolean }>();

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
const menuState = reactive<{ selectedKeys: string[]; openKeys: string[] }>({
  selectedKeys: [],
  openKeys: [],
});
const handleClickMenu: MenuProps['onClick'] = (menuInfo) => {
  router.push({ path: menuInfo.key as string });
};
watchEffect(() => {
  menuState.selectedKeys = [route.path];
  const keyList: any = route.path.slice(1).split('/');
  if (keyList.length === 1 || props.isCollapse) {
    menuState.openKeys = [''];
    return;
  }
  for (let index = 0; index < route.path.length; index++) {
    if (route.path[index] === '/') {
      menuState.openKeys.push(route.path.substr(0, index));
    }
  }
  menuState.openKeys.shift();
});
</script>

<style lang="scss" scoped></style>
