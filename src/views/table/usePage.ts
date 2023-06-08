import { useConfirm, useHandleApiRes, useMessage } from '@/hooks';
import { Request } from '@/service';
import { responseStatusCode } from '@/service/api';
import { ITableRes } from '@/service/types/table';
import { FormInstance, FormRules } from 'element-plus';

type THandle = 'create' | 'edit' | 'delete';

export function usePage({
  url,
  searchForm = {},
  queryForm = {},
  validateRules = {} as FormRules,
}: {
  url: string;
  searchForm?: Record<string, any>;
  queryForm?: Record<string, any>;
  validateRules: FormRules;
}) {
  const { success } = useMessage();
  const { t } = useI18n();
  const confirm = useConfirm();
  const loading = ref(false);
  const dataSource = ref<ITableRes>({ data: [], count: 0 });
  const pageInfo = reactive({
    currentPage: 1,
    pageSize: 20,
  });
  const formInline = reactive({ ...queryForm });
  const formRef = ref<FormInstance>();
  const rules = reactive<FormRules>(validateRules);
  const dialogParams = reactive<{
    visible: boolean;
    loading: boolean;
    type: Exclude<THandle, 'delete'>;
  }>({
    visible: false,
    loading: false,
    type: 'create',
  });
  const getPageData = async () => {
    loading.value = true;
    const { data, code } = await useHandleApiRes<ITableRes>(
      Request.get({
        url,
        params: { ...searchForm, ...pageInfo },
      })
    );
    if (code === responseStatusCode.success) {
      dataSource.value = data;
    }
    loading.value = false;
  };
  const handleSizeChange = (val: number) => {
    pageInfo.currentPage = 1;
    pageInfo.pageSize = val;
    getPageData();
  };
  const handleCurrentChange = (val: number) => {
    pageInfo.currentPage = val;
    getPageData();
  };
  const handleCancel = () => {
    dialogParams.type = 'create';
    pageInfo.currentPage = 1;
    dialogParams.visible = false;
    dialogParams.loading = false;
    Object.assign(formInline, { ...queryForm });
    formRef.value?.resetFields();
  };
  const handleConfirm = () => {
    formRef.value?.validate().then(async (valid) => {
      if (valid) {
        dialogParams.loading = true;
        if (dialogParams.type === 'create') {
          await handleCreate();
        } else {
          await handleEdit();
        }
        handleCancel();
        getPageData();
      }
    });
  };
  const handleAction = (type: THandle, row?: Record<string, any>) => {
    if (type === 'delete') {
      handleDelete(row!);
      return;
    }
    Object.assign(formInline, type === 'create' ? { ...queryForm } : row);
    dialogParams.type = type as Exclude<THandle, 'delete'>;
    dialogParams.visible = true;
  };
  const handleCreate = async () => {
    const { code } = await useHandleApiRes(
      Request.post({
        url,
        data: {
          ...formInline,
        },
      })
    );
    if (code === responseStatusCode.success) {
      success(t('tips.create_success'));
    }
  };
  const handleEdit = async () => {
    const { code } = await useHandleApiRes(
      Request.put({
        url,
        data: {
          ...formInline,
        },
      })
    );
    if (code === responseStatusCode.success) {
      success(t('tips.edit_success'));
    }
  };
  const handleDelete = (row: Record<string, any>) => {
    confirm({
      title: t('tips.delete'),
      content: t('tips.delete_confirm', {
        desc: row.name,
      }),
      options: {
        type: 'warning',
      },
    }).then(async () => {
      const { code } = await useHandleApiRes(
        Request.delete({
          url,
          params: { id: row.id },
        })
      );
      if (code === responseStatusCode.success) {
        success(t('tips.delete_success'));
        pageInfo.currentPage = 1;
        getPageData();
      }
    });
  };
  getPageData();

  return {
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
    handleCreate,
    handleEdit,
    handleDelete,
    handleCancel,
    handleConfirm,
  };
}
