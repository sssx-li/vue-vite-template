import { useHandleApiRes } from '@/hooks';
import { responseStatusCode } from '@/service/api';
import { getTableData } from '@/service/api/table';
import { ITableRes } from '@/service/types/table';

export function usePage(queryForm: Record<string, any>) {
  const dataSource = ref<ITableRes>({ data: [], count: 0 });
  const loading = ref(false);
  const getTableList = async () => {
    loading.value = true;
    const { data, code } = await useHandleApiRes<ITableRes>(
      getTableData(queryForm.name)
    );
    if (code === responseStatusCode.success) {
      dataSource.value = data;
    }
    loading.value = false;
  };
  getTableList();
  return {
    loading,
    dataSource,
    getTableList,
  };
}
