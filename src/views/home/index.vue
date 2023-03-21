<template>
  <div class="text-20px p-20px">
    首页
    <div class="box fac">测试盒子</div>
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
