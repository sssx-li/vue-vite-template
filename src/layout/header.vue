<template>
  <div class="header-container h-100%">
    <div class="flex justify-center items-center">
      <span
        class="cursor-pointer mr-14px text-20px flex justify-center items-center"
        @click="emits('update:isCollapse', !isCollapse)"
      >
        <i-ep:fold v-if="!isCollapse" />
        <i-ep:expand v-else />
      </span>
      <a-breadcrumb separator="/">
        <template v-for="(item, index) in breadcrumbs" :key="item.path">
          <a-breadcrumb-item
            :to="{ path: item.path }"
            v-if="index !== breadcrumbs.length - 1"
          >
            {{ item.title }}
          </a-breadcrumb-item>
          <a-breadcrumb-item v-else>{{ item.title }}</a-breadcrumb-item>
        </template>
      </a-breadcrumb>
    </div>
    <div class="flex justify-center items-center">
      <a-dropdown>
        <span class="flex justify-center items-center outline-none">
          <img :src="getImgUrl('avatar.png')" class="w-40px h-40px b-rd-50%" />
          <span class="ml-4px">{{ userInfo.username }}</span>
        </span>
        <template #overlay>
          <a-menu @click="handleCommand">
            <a-menu-item key="logout">
              <i-ep:switch-button class="mr-4px vertical-mid mt--5px" />
              登出
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuProps } from 'ant-design-vue/es';

defineProps<{ isCollapse?: boolean }>();
const emits = defineEmits(['update:isCollapse']);

const { clearCache } = useLocalCache();
const route = useRoute();
const router = useRouter();
const layoutRoutes = computed(
  () => router.getRoutes().find((item) => item.name === 'layout')?.children
);
const breadcrumbs = computed(() => {
  const breadcrumbArr: Array<{
    path: string;
    title: string;
    subTitle?: string;
  }> = [];
  const findBreadcrumb = (
    routes: Array<RouteRecordRaw>,
    parentRoute: RouteRecordRaw | null = null
  ) => {
    for (let index = 0; index < routes.length; index++) {
      const item = routes[index];
      if (item.path === route.path && item.meta?.title) {
        parentRoute &&
          parentRoute.meta &&
          breadcrumbArr.push({
            title: parentRoute!.meta.title as string,
            path: parentRoute.path,
          });
        breadcrumbArr.push({
          title: item.meta.title as string,
          path: item.path,
        });
        break;
      } else if (item.children && item.children.length > 0) {
        findBreadcrumb(item.children, item);
      }
    }
  };
  layoutRoutes.value && findBreadcrumb(layoutRoutes.value);
  return breadcrumbArr;
});
const { userInfo } = storeToRefs(useStore().user);

const handleCommand: MenuProps['onClick'] = ({ key }) => {
  if (key === 'logout') {
    clearCache();
    window.location.reload();
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  @include flex(center, space-between);
}
</style>
