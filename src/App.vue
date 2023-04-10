<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts" name="demo">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>
