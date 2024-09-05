<template>
  <el-dialog v-model="visible" :title="type === 'create' ? '新增' : '编辑'">
    <el-form
      :model="formInline"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      style="max-width: 460px"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="formInline.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="formInline.age" autocomplete="off" step="1" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select
          v-model="formInline.sex"
          placeholder="请选择性别"
          class="w-100%"
        >
          <el-option label="男" :value="1" />
          <el-option label="女" :value="0" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetDialog" :disabled="loading"> 取消 </el-button>
        <el-button type="primary" @click="handleConfirm" :loading="loading">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { IDialogCallbackType } from '@/hooks/useDialog';
import type { FormRules } from 'element-plus';

defineOptions({
  name: 'tableEditDialog',
  inheritAttrs: false,
});

export interface EmitType {
  (e: 'callback', type: IDialogCallbackType): void;
}

const emit = defineEmits<EmitType>();

const queryForm: {
  name: string;
  age: number | null;
  sex: number;
} = {
  name: '',
  age: null,
  sex: 1,
};
const ruleConfig: FormRules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change',
    },
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
      trigger: 'blur',
    },
    {
      type: 'number',
      message: '年龄必须为数字',
      trigger: 'change',
    },
  ],
};

const {
  formInline,
  formRef,
  rules,
  loading,
  visible,
  type,
  resetDialog,
  handleConfirm,
  handleCreate,
  handleEdit,
  openDialog,
} = useDialog<typeof queryForm>({
  url: EnumTableApi.LIST,
  queryForm,
  validateRules: ruleConfig,
  callback: (_type: IDialogCallbackType) => {
    if (_type !== 'close') {
      emit('callback', type.value);
    }
  },
});

defineExpose({
  handleCreate,
  handleEdit,
  openDialog,
});
</script>

<style lang="scss" scoped></style>
