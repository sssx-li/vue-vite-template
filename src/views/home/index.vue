<template>
  <div class="text-20px p-20px">
    首页-{{ $filters.dateFormat(Date.now()) }}
    <br />
    <input type="text" v-focus placeholder="测试聚焦指令" />
    <br />
    <TsxComp />
    <br />
    <test-comp />
    <sy-button>测试按钮</sy-button>
    <br />
    <i-sy-vue class="w20px h20px inline-block" />
  </div>
</template>

<script setup lang="ts">
import TsxComp from '@/components/TsxComp';
</script>
<style lang="scss" scoped></style>
