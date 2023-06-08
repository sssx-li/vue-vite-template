<template>
  <div class="text-20px">
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
import {
  ThemeUnion,
  useHandleApiRes,
  useLocalCache,
  useSwitchTheme,
} from '@/hooks';
import { useStore } from '@/store';

import TsxComp from '@/components/TsxComp';
import { getUserInfo } from '@/service/api';
import { IUserInfo } from '@/service/types/user';

const { userInfo } = storeToRefs(useStore().user);
const { getCache } = useLocalCache();

const currentTime = useDateFormat(useNow(), 'YYYY-MM-DD hh:mm:ss');
const cacheUserInfo = getCache('userInfo');

// 主题测试
const themeOptions: {
  value: ThemeUnion;
  label: string;
}[] = [
  { label: '默认主题', value: 'defaultTheme' },
  {
    label: '自定义主题',
    value: 'customTheme',
  },
];
const el = ref(null);
const activeTheme = ref<ThemeUnion>(getCache('theme'));
const { switchColor } = useSwitchTheme(el, activeTheme);
nextTick(() => {
  switchColor();
});

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
if (import.meta.env.VITE_MOCK_ENV) {
  getInfo();
}
</script>

<style lang="scss" scoped>
.theme-box {
  @include wh(180px, 40px);

  color: var(--sy-primary-title-color);
  background-color: var(--sy-primary-bg-color);
  border: 1px solid #ccc;
}
</style>
