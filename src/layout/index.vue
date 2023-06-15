<template>
  <a-layout class="h-100vh">
    <a-layout-sider theme="light" :collapsed="isCollapse">
      <side-bar :isCollapse="isCollapse" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="bg-#fff! px-20px!">
        <Header v-model:isCollapse="isCollapse" />
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Header from './header.vue';
import sideBar from './sideBar.vue';
const isCollapse = ref(false);
</script>

<style lang="scss" scoped>
.ant-layout-header {
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 24%);
}
</style>
