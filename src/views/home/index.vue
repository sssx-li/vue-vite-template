<template>
  <div class="text-20px p-20px">
    {{ user.username }} <br />
    <i-sy-vue class="w20px h20px inline-block" />
    {{ userInfo.username }} - {{ $filters.dateFormat(Date.now()) }}
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
import { ThemeUnion, useLocalCache, useSwitchTheme } from '@/hooks';
// import { ThemeUnion, useSwitchTheme, useHandleApiRes } from '@/hooks';
import { useStore } from '@/store';

import TsxComp from '@/components/TsxComp';
// import { Login, responseStatusCode } from '@/service/api';
// import { ILoginRes } from '@/service/types';

const { userInfo } = useStore().user;
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
const activeTheme = ref<ThemeUnion>('defaultTheme');
const { switchColor } = useSwitchTheme(el, activeTheme);

const { getCache, setCache } = useLocalCache();
setCache('userInfo', {
  username: 'sy',
  avatar: '',
});
const user = getCache('userInfo');

// 接口调用示例1
// Login({ password: 'admin123', username: 'sy' }).then((res) => {
//   const { code, data } = res.data.value;
//   if (code === responseStatusCode.success) {
//     console.log('data', data);
//   }
// });
// 接口调用示例2：使用useHandleApiRes
// const submit = async () => {
//   const { code, data, abort } = await useHandleApiRes<ILoginRes>(
//     Login({ password: 'admin123', username: 'sy' })
//   );
//   abort(); // 取消请求
//   if (code === responseStatusCode.success) {
//     console.log('data', data);
//   }
// };
</script>

<style lang="scss" scoped>
.theme-box {
  @include wh(180px, 40px);
  border: 1px solid #ccc;
  background-color: var(--sy-primary-bg-color);
  color: var(--sy-primary-title-color);
}
</style>
