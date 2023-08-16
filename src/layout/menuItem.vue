<template>
  <template v-for="item in routes" :key="item.path">
    <el-menu-item
      :index="item.path"
      v-if="!item.children || item.children.length === 0"
    >
      <el-icon :size="14" v-if="item.meta && item.meta.icon">
        <svg-icon :name="item.meta.icon as string" />
      </el-icon>
      <span>{{ item.meta?.title }}</span>
    </el-menu-item>
    <el-sub-menu :index="item.path" v-else>
      <template #title>
        <el-icon :size="14" v-if="item.meta && item.meta.icon">
          <svg-icon :name="item.meta.icon as string" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <menuItem :routes="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineOptions({
  name: 'menuItem',
});
defineProps<{ routes: Array<RouteRecordRaw> }>();
</script>
