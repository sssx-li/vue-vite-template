<template>
  <el-form :inline="true" :model="searchForm">
    <el-form-item :label="$t('table.username')">
      <el-input
        v-model="searchForm.name"
        :placeholder="$t('table.tips.enter_username')"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getPageData">
        {{ $t('table.search') }}
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleAction('create')">
        {{ $t('table.create') }}
      </el-button>
    </el-form-item>
  </el-form>
  <el-table :data="dataSource.data" style="width: 100%" v-loading="loading">
    <el-table-column prop="name" :label="$t('table.username')" />
    <el-table-column prop="age" :label="$t('table.age')" />
    <el-table-column prop="sex" :label="$t('table.sex')">
      <template #default="scope">
        {{ scope.row.sex === 1 ? $t('table.man') : $t('table.woman') }}
      </template>
    </el-table-column>
    <el-table-column prop="createTime" :label="$t('table.create_time')" />
    <el-table-column prop="handler" :label="$t('table.operate')">
      <template #default="scope">
        <el-button type="primary" link @click="handleAction('edit', scope.row)">
          {{ $t('table.edit') }}
        </el-button>
        <el-button
          type="danger"
          link
          @click="handleAction('delete', scope.row)"
        >
          {{ $t('table.delete') }}
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
    :title="
      dialogParams.type === 'create' ? $t('table.create') : $t('table.edit')
    "
  >
    <el-form
      :model="formInline"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      style="max-width: 460px"
    >
      <el-form-item :label="$t('table.username')" prop="name">
        <el-input v-model="formInline.name" autocomplete="off" />
      </el-form-item>
      <el-form-item :label="$t('table.age')" prop="age">
        <el-input v-model.number="formInline.age" autocomplete="off" step="1" />
      </el-form-item>
      <el-form-item :label="$t('table.sex')" prop="sex">
        <el-select
          v-model="formInline.sex"
          :placeholder="$t('table.tips.select_sex')"
          class="w-100%"
        >
          <el-option :label="$t('table.man')" :value="1" />
          <el-option :label="$t('table.woman')" :value="0" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel" :disabled="dialogParams.loading">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          :loading="dialogParams.loading"
        >
          {{ $t('table.ok') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Table } from '@/service/api';
import { usePage } from './usePage';

defineOptions({
  name: 'tableFirst',
});

const { t } = useI18n();
const searchForm = reactive({
  name: '',
});
const ruleConfig = computed(() => ({
  name: [
    {
      required: true,
      message: t('table.tips.enter_username'),
      trigger: 'blur',
    },
  ],
  sex: [
    {
      required: true,
      message: t('table.tips.select_sex'),
      trigger: 'change',
    },
  ],
  age: [
    {
      required: true,
      message: t('table.tips.enter_age'),
      trigger: 'blur',
    },
    {
      type: 'number',
      message: t('table.tips.age_must_be_a_number'),
      trigger: 'change',
    },
  ],
}));
const {
  loading,
  dataSource,
  pageInfo,
  formInline,
  formRef,
  rules,
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
  validateRules: ruleConfig as any,
});
</script>

<style lang="scss" scoped>
.el-table {
  height: calc(100vh - 210px);
}
</style>
