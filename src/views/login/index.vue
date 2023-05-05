<template>
  <div class="login-container fvc">
    <div class="form-content w450px p30px">
      <div class="title text-center text-30px mb30px">后台管理系统</div>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" size="large">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            show-password
            placeholder="请输入密码"
            @keydown="handleKeyDown"
          />
        </el-form-item>
        <el-form-item class="mt-40px">
          <el-button
            :loading="loading"
            @click="handleLogin"
            type="primary"
            class="w100%"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { useHandleApiRes, useLocalCache, useMessage } from '@/hooks';
import { Login, responseStatusCode } from '@/service/api';
import { ILoginRes } from '@/service/types/user';

const router = useRouter();
const { setCache } = useLocalCache();
const { error } = useMessage();

const loading = ref(false);
const ruleForm = reactive({
  username: '',
  password: '',
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 12, message: '用户名长度为2~12个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, max: 12, message: '密码长度为4~12个字符', trigger: 'blur' },
  ],
});

const handleLogin = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;
      const { code, data, message } = await useHandleApiRes<ILoginRes>(
        Login({ password: 'admin1234', username: 'sy' })
      );
      if (code === responseStatusCode.success) {
        setCache('token', data.token);
        router.push('/');
      } else {
        error(message);
      }
      loading.value = false;
    } else {
      console.log('error submit!', fields);
    }
  });
};
const handleKeyDown = (ev: KeyboardEvent) => {
  if (ev.key === 'Enter') {
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
  background: transparent;
  border: 0px;
  border-radius: 0px;
  padding: 12px 5px 12px 15px;
  color: #11142d;
  font-size: 16px;
  caret-color: #11142d;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px #fff inset !important;
    -webkit-text-fill-color: #11142d !important;
  }
}
</style>
