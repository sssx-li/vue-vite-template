<template>
  <a-layout>
    <a-layout-sider>
      <sideBar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header><Header /></a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Header from './header.vue';
import sideBar from './sideBar.vue';
</script>

<style lang="scss" scoped>
.ant-layout-header {
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 24%);
}
</style>
