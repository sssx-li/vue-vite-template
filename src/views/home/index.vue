<template>
  <div class="text-20px">
    <h1 class="text-18px">点我选择语言： <select-lang /></h1>
    <div class="box b-solid b-1 b-#f60 w-400px h-100px p-10px">
      {{ $t('title') }} <br />
      {{ $t('nav.login') }} <br />
      {{ $t('nav.logout') }}
    </div>
    当前时间: {{ currentTime }} <br />
    <el-icon :size="14">
      <svg-icon name="vue" />
    </el-icon>
    {{ cacheUserInfo.username }} <br />
    <i-sy-vue class="w20px h20px inline-block" />
    {{ userInfo?.username }}
    <br />
    <input type="text" v-focus placeholder="测试聚焦指令" class="my10px" />
    <br />
    <TsxComp />
    <test-comp />
    <sy-button>测试按钮</sy-button>
    <div class="theme-box fvc my10px" ref="el">
      <div class="text">主题测试区域</div>
    </div>
    <select placeholder="切换主题" v-model="activeTheme" @change="switchTheme">
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
import { ThemeTypes, useHandleApiRes, useLocalCache, useTheme } from '@/hooks';
import { useStore } from '@/store';

import TsxComp from '@/components/tsxComp';
import { getUserInfo } from '@/service/api';
import { IUserInfo } from '@/service/types/user';

const { userInfo } = storeToRefs(useStore().user);
const { getCache } = useLocalCache();

const currentTime = useDateFormat(useNow(), 'YYYY-MM-DD hh:mm:ss');
const cacheUserInfo = getCache('userInfo');

// 主题测试
const themeOptions: {
  value: ThemeTypes;
  label: string;
}[] = [
  { label: '默认主题', value: 'defaultTheme' },
  {
    label: '自定义主题',
    value: 'customTheme',
  },
];
const el = ref<HTMLElement>();
const activeTheme = ref<ThemeTypes>(getCache('theme'));
const { switchTheme } = useTheme(el, activeTheme);

// 接口使用示例
const getInfo = async () => {
  const { abort } = getUserInfo();
  setTimeout(() => {
    // 取消本次请求
    abort();
  }, 300);
  const { code, data, message } = await useHandleApiRes<IUserInfo>(
    getUserInfo()
  );
  userInfo.value = data;
  console.log(code, data, message);
};
getInfo();
</script>

<style lang="scss" scoped>
.theme-box {
  @include wh(180px, 40px);

  color: var(--sy-primary-title-color);
  background-color: var(--sy-primary-bg-color);
  border: 1px solid #ccc;
}
</style>
