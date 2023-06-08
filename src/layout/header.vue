<template>
  <div class="header-container h-100%">
    <div class="fhc">
      <el-icon
        :size="24"
        class="cursor-pointer mr-14px"
        @click="emits('update:isCollapse', !isCollapse)"
      >
        <i-ep:fold v-if="!isCollapse" />
        <i-ep:expand v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <template v-for="(item, index) in breadcrumbs" :key="item.path">
          <el-breadcrumb-item
            :to="{ path: item.path }"
            v-if="index !== breadcrumbs.length - 1"
          >
            {{ item.title }}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else>{{ item.title }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="fhc">
      <select-lang class="mr-14px" />
      <el-dropdown @command="handleCommand">
        <span class="fhc outline-none">
          <el-image
            :src="getImgUrl('avatar.png')"
            class="w-40px h-40px b-rd-50%"
          ></el-image>
          <span class="ml-4px">{{ userInfo.username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">
              <i-ep:switch-button class="mr-4px" />
              登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts" name="layout-header">
import { useStore } from '@/store';
import { getImgUrl } from '@/utils';
import { useLocalCache } from '@/hooks';

defineProps<{ isCollapse?: boolean }>();
const emits = defineEmits(['update:isCollapse']);

const { clearCache } = useLocalCache();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
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
            title: parentRoute!.meta.subTitle
              ? t(`nav.${parentRoute!.meta.title}`, {
                  subTitle: parentRoute!.meta.subTitle,
                })
              : t(`nav.${parentRoute!.meta.title}`),
            path: parentRoute.path,
          });
        breadcrumbArr.push({
          title: item.meta.subTitle
            ? t(`nav.${item.meta.title}`, {
                subTitle: item.meta.subTitle,
              })
            : t(`nav.${item.meta.title}`),
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

const handleCommand = (command: string) => {
  if (command === 'logout') {
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
