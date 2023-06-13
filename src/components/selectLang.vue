<template>
  <el-dropdown @command="handleCommand">
    <el-icon :size="size" class="outline-none cursor-pointer">
      <i-sy-lang />
    </el-icon>
    <template #dropdown>
      <el-dropdown-menu class="select-lang">
        <el-dropdown-item command="en" :class="[locale === 'en' && 'active']">
          English
        </el-dropdown-item>
        <el-dropdown-item command="zh" :class="[locale === 'zh' && 'active']">
          简体中文
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useLocalCache } from '@/hooks';
import { TLang } from '@/i18n';

defineOptions({
  name: 'SelectLang',
});
withDefaults(defineProps<{ size?: number }>(), {
  size: 22,
});

const { setCache } = useLocalCache();

const { locale } = useI18n();
const handleCommand = (command: TLang) => {
  locale.value = command;
  setCache('lang', command);
};
</script>

<style lang="scss">
.select-lang {
  .el-dropdown-menu__item.active {
    color: var(--el-dropdown-menuItem-hover-color);
    background-color: var(--el-dropdown-menuItem-hover-fill);
  }
}
</style>
