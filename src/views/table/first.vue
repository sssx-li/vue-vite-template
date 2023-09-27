<template>
  <el-form @submit.prevent :inline="true" :model="searchForm">
    <el-form-item label="用户名">
      <el-input v-model="searchForm.name" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="refreshData"> 搜索 </el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="dialogRef?.openDialog('create')">
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
        <el-button
          type="primary"
          link
          @click="dialogRef?.openDialog('edit', scope.row)"
        >
          编辑
        </el-button>
        <el-button type="danger" link @click="handleDelete(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="flex justify-center mt-14px">
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :total="dataSource.count"
    />
  </div>
  <editDialog @callback="getPageData" ref="dialogRef" />
</template>

<script setup lang="ts">
import editDialog from './editDialog.vue';

import type { TableItem } from '@/service/types';

const dialogRef = ref<InstanceType<typeof editDialog>>();
const searchForm = reactive({
  name: '',
});

const {
  loading,
  dataSource,
  pageInfo,
  getPageData,
  refreshData,
  pageSizeChange,
  currentPageChange,
  handleDelete,
} = usePage<TableItem>({
  url: TableEnum.LIST,
  searchForm,
});
</script>

<style lang="scss" scoped>
.el-table {
  height: calc(100vh - 220px);
}
</style>
