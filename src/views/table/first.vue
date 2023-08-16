<template>
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="用户名">
      <el-input v-model="searchForm.name" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getPageData"> 搜索 </el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleAction('create')">
        新增
      </el-button>
    </el-form-item>
  </el-form>
  <el-table :data="dataSource.data" style="width: 100%" v-loading="loading">
    <el-table-column prop="name" label="用户名" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="sex" label="性别">
      <template #default="scope">
        {{ scope.row.sex === 1 ? '男' : '女' }}
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="handler" label="操作">
      <template #default="scope">
        <el-button type="primary" link @click="handleAction('edit', scope.row)">
          编辑
        </el-button>
        <el-button
          type="danger"
          link
          @click="handleAction('delete', scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="flex justify-center mt-14px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :total="dataSource.count"
    />
  </div>
  <el-dialog
    v-model="dialogParams.visible"
    :title="dialogParams.type === 'create' ? '新增' : '编辑'"
    @closed="handleCancel"
  >
    <el-form
      :model="formInline"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      style="max-width: 460px"
    >
      <el-form-item label="用户名" prop="name">
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
        <el-button
          @click="dialogParams.visible = false"
          :disabled="dialogParams.loading"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          :loading="dialogParams.loading"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Table } from '@/service/api';
import { usePage } from './usePage';
import { FormRules } from 'element-plus';

const searchForm = reactive({
  name: '',
});
const rules: FormRules = {
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
  loading,
  dataSource,
  pageInfo,
  formInline,
  formRef,
  dialogParams,
  getPageData,
  handleSizeChange,
  handleCurrentChange,
  handleAction,
  handleCancel,
  handleConfirm,
} = usePage({
  url: Table.LIST,
  searchForm,
  queryForm: { name: '', age: '', sex: 1 },
});
</script>

<style lang="scss" scoped>
.el-table {
  height: calc(100vh - 210px);
}
</style>
