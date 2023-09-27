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

  // 展示数据size改变
  const pageSizeChange = (val: number) => {
    pageInfo.currentPage = 1;
    pageInfo.pageSize = val;
  };
  // 页码改变
  const currentPageChange = (val: number) => {
    pageInfo.currentPage = val;
  };

  // 页码重置
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
