/**
 * 分页组件参数
 * @returns
 */
export function usePagination() {
  const pageInfo = reactive({
    currentPage: 1,
    pageSize: 20,
  });

  const total = ref(0);

  const pageSizeChange = (val: number) => {
    pageInfo.currentPage = 1;
    pageInfo.pageSize = val;
  };

  const currentPageChange = (val: number) => {
    pageInfo.currentPage = val;
  };

  const resetPageSize = () => {
    pageInfo.currentPage = 1;
  };

  return {
    total,
    pageInfo,
    pageSizeChange,
    currentPageChange,
    resetPageSize,
  };
}
