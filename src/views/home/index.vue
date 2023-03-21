<template>
  <div class="text-20px p-20px">
    首页
    <test-comp />
    <sy-button>测试按钮</sy-button>
    <i-sy-vue class="w20px h20px inline-block" />
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.box {
  @include wh(250px, 100px);
  justify-content: center;
  border: 1px solid #ccc;
}
</style>
