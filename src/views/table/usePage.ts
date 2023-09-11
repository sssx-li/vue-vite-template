import { useForm, Rule } from 'ant-design-vue/es/form';

import type { TableDataRes } from '@/service/types';

type THandle = 'create' | 'edit' | 'delete';

export function usePage({
  url,
  searchForm = {},
  queryForm = {},
  validateRules = {} as Rule,
}: {
  url: string;
  searchForm?: Record<string, any>;
  queryForm?: Record<string, any>;
  validateRules: Rule;
}) {
  const { success } = useMessage();
  const confirm = useConfirm();
  const loading = ref(false);
  const dataSource = ref<TableDataRes>({ data: [], count: 0 });
  const pageInfo = reactive({
    currentPage: 1,
    pageSize: 10,
  });
  const formInline = reactive({ ...queryForm });
  const { resetFields, validate, validateInfos } = useForm(
    formInline,
    validateRules
  );
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
    const { data, code } = await useHandleApiRes<TableDataRes>(
      ApiRequest.get({
        url,
        params: { ...searchForm, ...pageInfo },
      })
    );
    if (code === ResponseStatusCodeEnum.success) {
      dataSource.value = data;
    }
    loading.value = false;
  };
  const handleSizeChange = (pageNo: number, pageSize: number) => {
    pageInfo.currentPage = pageNo;
    if (pageSize !== pageInfo.pageSize) {
      pageInfo.currentPage = 1;
      pageInfo.pageSize = pageSize;
    }
    getPageData();
  };
  const handleCancel = () => {
    dialogParams.type = 'create';
    pageInfo.currentPage = 1;
    dialogParams.visible = false;
    dialogParams.loading = false;
    Object.assign(formInline, { ...queryForm });
    resetFields();
  };
  const handleConfirm = () => {
    validate().then(async (valid) => {
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
      ApiRequest.post({
        url,
        data: {
          ...formInline,
        },
      })
    );
    if (code === ResponseStatusCodeEnum.success) {
      success('创建成功');
    }
  };
  const handleEdit = async () => {
    const { code } = await useHandleApiRes(
      ApiRequest.put({
        url,
        data: {
          ...formInline,
        },
      })
    );
    if (code === ResponseStatusCodeEnum.success) {
      success('编辑成功');
    }
  };
  const handleDelete = (row: Record<string, any>) => {
    confirm({
      title: '删除',
      content: `确定要删除 ${row.name} 这条记录吗? 删除之后不能恢复哦！`,
      okType: 'danger',
    }).then(async () => {
      const { code } = await useHandleApiRes(
        ApiRequest.delete({
          url,
          params: { id: row.id },
        })
      );
      if (code === ResponseStatusCodeEnum.success) {
        success('删除成功');
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
    validateInfos,
    dialogParams,
    getPageData,
    handleSizeChange,
    handleAction,
    handleCreate,
    handleEdit,
    handleDelete,
    handleCancel,
    handleConfirm,
  };
}
