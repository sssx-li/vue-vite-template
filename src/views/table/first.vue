<template>
  <a-form layout="inline" :model="searchForm">
    <a-form-item :label="$t('table.username')">
      <a-input
        v-model:value="searchForm.name"
        :placeholder="$t('table.tips.enter_username')"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="getPageData">
        {{ $t('table.search') }}
      </a-button>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleAction('create')">
        {{ $t('table.create') }}
      </a-button>
    </a-form-item>
  </a-form>
  <a-table
    :dataSource="dataSource.data"
    :loading="loading"
    :pagination="false"
    class="mt-14px"
  >
    <a-table-column
      key="name"
      data-index="name"
      :title="$t('table.username')"
    />
    <a-table-column key="age" data-index="age" :title="$t('table.age')" />
    <a-table-column key="sex" :title="$t('table.sex')">
      <template #default="{ record }">
        {{ record.sex === 1 ? $t('table.man') : $t('table.woman') }}
      </template>
    </a-table-column>
    <a-table-column
      key="createTime"
      data-index="createTime"
      :title="$t('table.create_time')"
    />
    <a-table-column key="handler" :title="$t('table.operate')">
      <template #default="{ record }">
        <a-button type="link" primary @click="handleAction('edit', record)">
          {{ $t('table.edit') }}
        </a-button>
        <a-button danger type="link" @click="handleAction('delete', record)">
          {{ $t('table.delete') }}
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
    :title="
      dialogParams.type === 'create' ? $t('table.create') : $t('table.edit')
    "
  >
    <a-form
      :model="formInline"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      style="max-width: 460px"
    >
      <a-form-item
        :label="$t('table.username')"
        name="name"
        v-bind="validateInfos.name"
      >
        <a-input v-model:value="formInline.name" autocomplete="off" />
      </a-form-item>
      <a-form-item
        :label="$t('table.age')"
        name="age"
        v-bind="validateInfos.age"
      >
        <a-input
          v-model:value.number="formInline.age"
          autocomplete="off"
          step="1"
        />
      </a-form-item>
      <a-form-item
        :label="$t('table.sex')"
        name="sex"
        v-bind="validateInfos.sex"
      >
        <a-select
          v-model:value="formInline.sex"
          :placeholder="$t('table.tips.select_sex')"
          class="w-100%"
        >
          <a-select-option :value="1">{{ $t('table.man') }}</a-select-option>
          <a-select-option :value="0">{{ $t('table.woman') }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <template #footer>
      <span class="dialog-footer">
        <a-button @click="handleCancel" :disabled="dialogParams.loading">
          {{ $t('table.cancel') }}
        </a-button>
        <a-button
          type="primary"
          @click="handleConfirm"
          :loading="dialogParams.loading"
        >
          {{ $t('table.ok') }}
        </a-button>
      </span>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { usePage } from './usePage';

const { t } = useI18n();
const searchForm = reactive({
  name: '',
});
const ruleConfig = computed(() => ({
  name: [
    {
      required: true,
      message: t('table.tips.enter_username'),
    },
  ],
  sex: [
    {
      required: true,
      message: t('table.tips.select_sex'),
    },
  ],
  age: [
    {
      required: true,
      message: t('table.tips.enter_age'),
    },
    {
      type: 'number',
      message: t('table.tips.age_must_be_a_number'),
    },
  ],
}));
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
  validateRules: ruleConfig as any,
});
</script>

<style lang="scss" scoped></style>
