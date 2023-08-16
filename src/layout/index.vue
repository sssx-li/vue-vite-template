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

<script setup lang="ts">
import Header from './header.vue';
import sideBar from './sideBar.vue';

const { width } = useWindowSize();
const isCollapse = ref(false);

watchEffect(() => {
  if (width.value <= 800) {
    isCollapse.value = true;
  }
});
</script>

<style lang="scss" scoped>
.el-header {
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 24%);
}
</style>
