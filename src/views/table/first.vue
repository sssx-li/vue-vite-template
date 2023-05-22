<template>
  <el-form :inline="true" :model="queryForm" class="demo-form-inline">
    <el-form-item label="姓名：">
      <el-input v-model="queryForm.name" placeholder="输入用户名" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getTableList">搜索</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="dataSource.data" style="width: 100%" v-loading="loading">
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="sex" label="性别">
      <template #default="scope">
        {{ scope.row.sex === 1 ? '男' : '女' }}
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="200" />
  </el-table>
</template>

<script setup lang="ts" name="table-first">
import { usePage } from './usePage';

const queryForm = reactive({
  name: '',
});
const { loading, dataSource, getTableList } = usePage(queryForm);
</script>

<style lang="scss" scoped></style>
