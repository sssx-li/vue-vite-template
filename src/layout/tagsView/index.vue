<template>
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
        v-for="item in tags"
        :key="item.path"
        @click="$router.push(item.path)"
        @close="closeTag(item)"
        :effect="$route.path === item.path ? 'light' : 'plain'"
      >
        {{ item.name }}
      </el-tag>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useTags } from './useTags';

defineOptions({
  name: 'LayoutTags',
  inheritAttrs: false,
});

const { scrollTagsRef, tags, closeTag } = useTags();
</script>

<style lang="scss" scoped></style>
