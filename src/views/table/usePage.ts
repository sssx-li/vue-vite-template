import { usePagination } from './usePagination';

import type { FormInstance } from 'element-plus';
import type { TableListRes } from '@/service/types';

type THandle = 'create' | 'edit' | 'delete';

export function usePage({
  url,
  searchForm = {},
  queryForm = {},
}: {
  url: string;
  searchForm?: Record<string, any>;
  queryForm?: Record<string, any>;
}) {
  const { success } = useMessage();
  const confirm = useConfirm();
  const loading = ref(false);
  const dataSource = ref<TableListRes>({ data: [], count: 0 });

  const { pageInfo, pageSizeChange, currentPageChange, resetPageSize } =
    usePagination();
  watch(
    () => pageInfo,
    () => {
      getPageData();
    },
    { deep: true }
  );

  const formInline = reactive({ ...queryForm });
  const formRef = ref<FormInstance>();
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
    const { data, code } = await useHandleApiRes<TableListRes>(
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

  const handleCancel = () => {
    dialogParams.type = 'create';
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
        pageInfo.currentPage === 1 ? getPageData() : resetPageSize();
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
      success('新增成功');
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
      options: {
        type: 'warning',
      },
    }).then(async () => {
      const { code } = await useHandleApiRes(
        ApiRequest.delete({
          url,
          params: { id: row.id },
        })
      );
      if (code === ResponseStatusCodeEnum.success) {
        success('删除成功');
        pageInfo.currentPage === 1 ? getPageData() : resetPageSize();
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
    dialogParams,
    getPageData,
    pageSizeChange,
    currentPageChange,
    handleAction,
    handleCreate,
    handleEdit,
    handleDelete,
    handleCancel,
    handleConfirm,
  };
}
