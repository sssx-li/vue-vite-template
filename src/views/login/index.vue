<template>
  <div class="login-container flex justify-center items-center flex-clo">
    <div class="form-content w450px p30px relative">
      <div class="title text-center text-30px mb30px">后台管理系统</div>
      <a-form :model="loginForm" size="large">
        <a-form-item name="username" v-bind="validateInfos.username">
          <a-input
            v-model:value="loginForm.username"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item name="password" v-bind="validateInfos.password">
          <a-input
            v-model:value="loginForm.password"
            type="password"
            show-password
            placeholder="请输入密码"
            @keydown="handleKeyDown"
          />
        </a-form-item>
        <a-form-item class="mt-40px">
          <a-button
            :loading="loading"
            @click="handleLogin"
            type="primary"
            class="w100%"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'ant-design-vue/lib/form';

import type { UserLoginRes } from '@/service/types';

const router = useRouter();
const { setCache } = useLocalCache();

const loading = ref(false);
const loginForm = reactive({
  username: '',
  password: '',
});
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
    {
      min: 2,
      max: 12,
      message: '用户名长度为2~12个字符',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
    {
      min: 4,
      max: 12,
      message: '密码长度为4~12个字符',
    },
  ],
};
const { resetFields, validate, validateInfos } = useForm(loginForm, rules);

const handleLogin = () => {
  validate().then(async (valid) => {
    if (valid) {
      loading.value = true;
      const { code, data } = await useHandleApiRes<UserLoginRes>(
        useLogin({ ...loginForm })
      );
      if (code === ResponseStatusCodeEnum.success) {
        setCache('token', data.token);
        router.push('/');
      }
      resetFields();
      loading.value = false;
    }
  });
};
const handleKeyDown = (ev: KeyboardEvent | Event) => {
  if ((ev as KeyboardEvent).key === 'Enter') {
    handleLogin();
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  @include wh(100%, 100vh);

  .form-content {
    border: 1px solid #ccc;
    border-radius: 8px;
  }
}
</style>

<style lang="scss">
/* 解决Chrome浏览器输入框自动填充背景色 */
input {
  display: inline-block;
  padding: 12px 5px 12px 15px;
  font-size: 16px;
  color: #11142d;
  caret-color: #11142d;
  background: transparent;
  border: 0;
  border-radius: 0;

  &:-webkit-autofill {
    box-shadow: 0 0 0 1000px #fff inset !important;
    -webkit-text-fill-color: #11142d !important;
  }
}
</style>
