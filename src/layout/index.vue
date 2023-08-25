<template>
  <el-container class="h-100vh">
    <el-aside width="auto">
      <SideBar :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header height="auto">
        <Header v-model:isCollapse="isCollapse" />
        <TagsView />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from './header.vue';
import SideBar from './sideBar.vue';
import TagsView from './tagsView/index.vue';

defineOptions({
  name: 'Layout',
  inheritAttrs: false,
});

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
  padding: 0;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 24%);
}
</style>
