<template>
  <a-config-provider :locale="locale === 'zh' ? zh : en">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import zh from 'ant-design-vue/es/locale/zh_CN';
import en from 'ant-design-vue/es/locale/en_US';
const { locale } = useI18n();
</script>
