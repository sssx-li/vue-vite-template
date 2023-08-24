<template>
  <a-dropdown>
    <div :class="[`text-${size}`]">
      <svg-icon
        name="lang"
        class="outline-none cursor-pointer"
        :style="{ 'font-size': `${size}px` }"
        @click.prevent
      />
    </div>
    <template #overlay>
      <a-menu class="select-lang" @click="handleCommand">
        <a-menu-item key="en" :class="[locale === 'en' && 'active']">
          English
        </a-menu-item>
        <a-menu-item key="zh" :class="[locale === 'zh' && 'active']">
          简体中文
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue/es';
import type { LangType } from '@/i18n';

withDefaults(defineProps<{ size?: number }>(), {
  size: 22,
});

const { setCache } = useLocalCache();

const { locale } = useI18n();
const handleCommand: MenuProps['onClick'] = ({ key }) => {
  locale.value = key as LangType;
  setCache('lang', key as LangType);
};
</script>

<style lang="scss">
.select-lang {
  .ant-dropdown-menu-item.active {
    background-color: #f5f5f5;
  }
}
</style>
