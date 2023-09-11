<template>
  <a-form layout="inline" :model="searchForm">
    <a-form-item label="用户名">
      <a-input v-model:value="searchForm.name" placeholder="请输入用户名" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="getPageData"> 搜索 </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleAction('create')"> 新增 </a-button>
    </a-form-item>
  </a-form>
  <a-table
    :dataSource="dataSource.data"
    :loading="loading"
    :pagination="false"
    class="mt-14px"
  >
    <a-table-column key="name" data-index="name" title="用户名" />
    <a-table-column key="age" data-index="age" title="年龄" />
    <a-table-column key="sex" title="性别">
      <template #default="{ record }">
        {{ record.sex === 1 ? '男' : '女' }}
      </template>
    </a-table-column>
    <a-table-column key="createTime" data-index="createTime" title="创建时间" />
    <a-table-column key="handler" title="操作">
      <template #default="{ record }">
        <a-button type="link" primary @click="handleAction('edit', record)">
          编辑
        </a-button>
        <a-button danger type="link" @click="handleAction('delete', record)">
          删除
        </a-button>
      </template>
    </a-table-column>
  </a-table>
  <div class="flex justify-center mt-14px">
    <a-pagination
      v-model:current="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :total="dataSource.count"
      layout="total, sizes, prev, pager, next, jumper"
      @change="handleSizeChange"
    />
  </div>
  <a-modal
    v-model:visible="dialogParams.visible"
    :title="dialogParams.type === 'create' ? '新增' : '编辑'"
  >
    <a-form
      :model="formInline"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      style="max-width: 460px"
    >
      <a-form-item label="用户名" name="name" v-bind="validateInfos.name">
        <a-input v-model:value="formInline.name" autocomplete="off" />
      </a-form-item>
      <a-form-item label="年龄" name="age" v-bind="validateInfos.age">
        <a-input
          v-model:value.number="formInline.age"
          autocomplete="off"
          step="1"
        />
      </a-form-item>
      <a-form-item label="性别" name="sex" v-bind="validateInfos.sex">
        <a-select
          v-model:value="formInline.sex"
          placeholder="请选择性别"
          class="w-100%"
        >
          <a-select-option :value="1">男</a-select-option>
          <a-select-option :value="0">女</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <template #footer>
      <span class="dialog-footer">
        <a-button @click="handleCancel" :disabled="dialogParams.loading">
          取消
        </a-button>
        <a-button
          type="primary"
          @click="handleConfirm"
          :loading="dialogParams.loading"
        >
          确认
        </a-button>
      </span>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { usePage } from './usePage';

const searchForm = reactive({
  name: '',
});
const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
    },
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
    },
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
    },
    {
      type: 'number',
      message: '年龄必须为数字',
    },
  ],
};
const {
  loading,
  dataSource,
  pageInfo,
  formInline,
  validateInfos,
  dialogParams,
  getPageData,
  handleSizeChange,
  handleAction,
  handleCancel,
  handleConfirm,
} = usePage({
  url: TableEnum.LIST,
  searchForm,
  queryForm: { name: '', age: '', sex: 1 },
  validateRules: rules as any,
});
</script>

<style lang="scss" scoped></style>
