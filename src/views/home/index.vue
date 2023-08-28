<template>
  <div class="text-20px">
    <h1 class="text-18px">点我选择语言： <select-lang /></h1>
    <div class="box b-solid b-1 b-#f60 w-400px h-100px p-10px">
      {{ $t('title') }} <br />
      {{ $t('nav.login') }} <br />
      {{ $t('nav.logout') }}
    </div>
    当前时间: {{ currentTime }} <br />

    {{ cacheUserInfo.username }} <br />
    {{ userInfo?.username }} <br />

    icon使用方式1：
    <el-icon :size="14">
      <svg-icon name="vue" />
    </el-icon>
    <br />
    icon使用方式3：<i-sy-vue class="w20px h20px inline-block" />
    <br />
    聚焦指令：<input
      type="text"
      v-model="text"
      v-focus
      placeholder="测试聚焦指令"
      class="my10px"
    />
    <br />
    防抖指令：<input
      type="text"
      v-model="text"
      v-debounce="{ callback: ($event) => inputChange('debounce', $event) }"
      placeholder="输入防抖"
      class="my10px"
    />
    <br />
    <button v-debounce="{ type: 'click', callback: clickButton }">
      按钮防抖
    </button>
    <br />
    节流指令：<input
      type="text"
      v-model="text"
      v-throttle="{ callback: ($event) => inputChange('throttle', $event) }"
      placeholder="输入节流"
      class="my10px"
    />
    <br />
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
import type { ThemeTypes } from '@/hooks/useTheme';
import type { UserInfo } from '@/service/types';

const { userInfo } = storeToRefs(useStore().user);
const { getCache } = useLocalCache();

const currentTime = useDateFormat(useNow(), 'YYYY-MM-DD hh:mm:ss');
const cacheUserInfo = getCache('userInfo');

// 自定义指令
const text = ref('');
const inputChange = (type: 'debounce' | 'throttle', evt: Event) => {
  if (type === 'debounce') {
    console.log('触发输入防抖:', evt);
  } else {
    console.log('触发输入节流:', evt);
  }
};
const clickButton = () => {
  console.log('触发按钮防抖');
};

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
  const { abort } = useGetUserInfo();
  setTimeout(() => {
    // 取消本次请求
    abort();
  }, 300);
  const { code, data, message } = await useHandleApiRes<UserInfo>(
    useGetUserInfo()
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
