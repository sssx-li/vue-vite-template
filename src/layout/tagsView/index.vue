<template>
  <div class="tags-container relative">
    <el-scrollbar
      class="h-auto! py-4px"
      :vertical="false"
      height="24px"
      always
      ref="scrollTagsRef"
    >
      <div class="flex flex-nowrap">
        <!-- 这里的必须将 disable-transitions设置为true;否则动画会影响el-scrollbar的更新计算导致滚动到当前tag失败(可以使用延迟调用解决) -->
        <el-tag
          class="mx-4px cursor-pointer tag-item"
          closable
          disable-transitions
          :effect="$route.path === item.path ? 'light' : 'plain'"
          v-for="item in tagsView.tags.value"
          :key="item.path"
          @click="$router.push(item.path)"
          @close="closeTag(item)"
          @contextmenu.prevent="openTagMenu(item, $event)"
        >
          {{ item.name }}
        </el-tag>
      </div>
    </el-scrollbar>
    <ul
      :class="['tags-menus', 'absolute', 'p-4px', `w-${MENU_WIDTH}px`]"
      :style="{ left: `${menuPosition.left}px`, top: `${menuPosition.top}px` }"
      ref="tagMenuRef"
      v-if="showMenu"
    >
      <li
        v-for="menu in menuList"
        :key="menu.type"
        :class="[
          'cursor-pointer',
          'lh-30px',
          'flex',
          'items-center',
          'px-6px',
          'c-666',
          'text-14px',
          'menu-item',
        ]"
        @click="handleMenuClick(menu.type)"
      >
        <el-icon :size="14" color="var(--el-text-color-regular)" class="mr-8px">
          <svg-icon :name="menu.icon"></svg-icon>
        </el-icon>
        {{ menu.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useZIndex } from 'element-plus';
import { useTags, SPACING } from './useTags';
import { useTagMenus } from './useTagMenus';
defineOptions({
  name: 'LayoutTags',
  inheritAttrs: false,
});

const { nextZIndex } = useZIndex();
const zIndex = nextZIndex();

const { tagsView, scrollTagsRef, closeTag } = useTags();
const {
  tagMenuRef,
  menuPosition,
  showMenu,
  MENU_WIDTH,
  menuList,
  openTagMenu,
  handleMenuClick,
} = useTagMenus(scrollTagsRef, tagsView);
</script>

<style lang="scss" scoped>
.tags-menus {
  z-index: v-bind('zIndex');
  list-style: none;
  background-color: var(--el-bg-color-overlay);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);

  .menu-item {
    &:hover {
      background-color: var(--el-fill-color-light);
    }
  }
}
</style>
