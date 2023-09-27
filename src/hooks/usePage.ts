import { usePagination } from './usePagination';

import type { TableRes } from '@/service/types';

export function usePage<T = any>({
  url,
  searchForm = {},
}: {
  url: string;
  searchForm?: Record<string, any>;
}) {
  const { success } = useMessage();
  const { t } = useI18n();
  const confirm = useConfirm();

  // 表格数据
  const loading = ref(false);
  const dataSource = reactive<TableRes<T>>({ data: [], count: 0 });
  // 分页
  const { pageInfo, pageSizeChange, currentPageChange, resetPageSize } =
    usePagination();

  // 获取数据
  const getPageData = async () => {
    loading.value = true;
    const { data, code } = await useHandleApiRes<TableRes<T>>(
      ApiRequest.get({
        url,
        params: { ...searchForm, ...pageInfo },
      })
    );
    if (code === ResponseStatusCodeEnum.success) {
      Object.assign(dataSource, data);
    }
    loading.value = false;
  };
  // 刷新
  const refreshData = () => {
    pageInfo.currentPage === 1 ? getPageData() : resetPageSize();
  };
  // 删除
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
        ApiRequest.delete({
          url,
          params: { id: row.id },
        })
      );
      if (code === ResponseStatusCodeEnum.success) {
        success(t('tips.delete_success'));
        refreshData();
      }
    });
  };

  getPageData();
  watch(
    () => pageInfo,
    () => {
      getPageData();
    },
    { deep: true }
  );

  return {
    loading,
    dataSource,
    pageInfo,
    getPageData,
    refreshData,
    resetPageSize,
    pageSizeChange,
    currentPageChange,
    handleDelete,
  };
}
