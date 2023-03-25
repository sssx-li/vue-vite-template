<template>
  <div class="text-20px p-20px">
    首页-{{ $filters.dateFormat(Date.now()) }}
    <br />
    <input type="text" v-focus placeholder="测试聚焦指令" class="my10px" />
    <br />
    <TsxComp />
    <test-comp />
    <sy-button>测试按钮</sy-button>
    <i-sy-vue class="w20px h20px inline-block" />
    <div class="theme-box fvc mt10px" ref="el">
      <div class="text">主题测试区域</div>
    </div>
    <br />
    <select placeholder="切换主题" v-model="activeTheme" @change="switchColor">
      <option
        v-for="theme in themeOptions"
        :key="theme.value"
        :value="theme.value"
      >
        {{ theme.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ThemeUnion, useSwitchTheme } from '@/hooks';
import TsxComp from '@/components/TsxComp';

// 主题测试
interface ITheme {
  value: ThemeUnion;
  label: string;
}
const themeOptions: ITheme[] = [
  { label: '默认主题', value: 'defaultTheme' },
  {
    label: '自定义主题',
    value: 'customTheme',
  },
];
const el = ref(null);
const activeTheme = ref<ThemeUnion>('defaultTheme');
const { switchColor } = useSwitchTheme(el, activeTheme);
</script>

<style lang="scss" scoped>
.theme-box {
  @include wh(180px, 40px);
  border: 1px solid #ccc;
  background-color: var(--sy-primary-bg-color);
  color: var(--sy-primary-title-color);
}
</style>
