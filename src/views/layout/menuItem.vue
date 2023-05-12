<template>
  <template v-for="item in routes" :key="item.path">
    <el-menu-item
      :index="item.path"
      v-if="!item.children || item.children.length === 0"
    >
      <span>{{ item.meta?.title }}</span>
    </el-menu-item>
    <el-sub-menu :index="item.path" v-else>
      <template #title>
        <span>{{ item.meta?.title }}</span>
      </template>
      <menuItem :routes="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="menuItem">
defineProps<{ routes: Array<RouteRecordRaw> }>();
</script>

<style lang="scss" scoped></style>
