<template>
  <div class="test-container fac">测试组件</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.test-container {
  @include wh(250px, 100px);
  justify-content: center;
  border: 1px solid #ccc;
}
</style>
