<template>
  <el-container class="h-100vh">
    <el-aside width="auto">
      <sideBar :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <Header v-model:isCollapse="isCollapse" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="layout">
import Header from './header.vue';
import sideBar from './sideBar.vue';
const isCollapse = ref(false);
</script>

<style lang="scss" scoped>
.el-header {
  border-bottom: 1px solid #ccc;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.24);
}
</style>
