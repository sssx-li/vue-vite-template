<template>
  <div class="text-20px p-20px">
    当前时间: {{ currentTime }} <br />
    <svg-icon name="vue" />
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
    <br />
    语言测试：{{ $t('nav.logout') }}
    <br />
    当前语言环境: {{ locale === 'en' ? 'English' : '中文' }}
    <br />
    <button @click="changeLang(locale === 'en' ? 'zh' : 'en')">
      点我切换语言
    </button>
  </div>
</template>

<script setup lang="ts">
import { ThemeTypes, useHandleApiRes, useLocalCache, useTheme } from '@/hooks';
import { useStore } from '@/store';

import TsxComp from '@/components/tsxComp';
import { Login, getUserInfo } from '@/service/api';
import { IUserInfo } from '@/service/types/user';
import { TLang } from '@/i18n';

const { userInfo } = storeToRefs(useStore().user);
const { getCache, setCache } = useLocalCache();

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
const { switchColor } = useTheme(el, activeTheme);

const { t, locale } = useI18n();
console.log('-----t-----', t('nav.logout'));
const changeLang = (lang: TLang) => {
  locale.value = lang;
  setCache('lang', lang);
};

// 接口使用示例
const getInfo = async () => {
  await Login({ username: 'sssx', password: '123456' });
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
