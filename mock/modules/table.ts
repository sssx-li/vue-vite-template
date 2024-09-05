import Mock from 'mockjs';

import { createResponse } from '../utils';

import type { ITableItem } from '@/service/types';
import type { IMockItem } from 'mock/types';

const tableData: { data: ITableItem[] } = Mock.mock({
  'data|105': [
    {
      'id|+1': 1,
      name: '@cname',
      'sex|1': [0, 1],
      'age|1-100': 1,
      createTime: '@datetime',
    },
  ],
});

const tableMocks: IMockItem[] = [
  // 获取列表
  {
    url: EnumTableApi.LIST,
    method: 'get',
    response: (schema, request) => {
      const { name, currentPage, pageSize } = request.queryParams;
      const resData = JSON.parse(JSON.stringify(tableData));
      const renderData = (resData.data = tableData.data.filter((item) => {
        if (!name) return true;
        return item.name.indexOf(name as string) !== -1;
      }));
      // 模糊搜索 + 分页(如果 pageSize 不存在时，返回所有数据)
      if (!pageSize) {
        resData.data = renderData;
      } else {
        resData.data = renderData.slice(
          (+currentPage! - 1) * +pageSize,
          +currentPage! * +pageSize
        );
      }
      resData.count = tableData.data.length;
      return createResponse(resData);
    },
  },
  // 修改项
  {
    url: EnumTableApi.LIST,
    method: 'put',
    response: (schema, request) => {
      const query = JSON.parse(request.requestBody);
      const index = tableData.data.findIndex((item) => item.id === query.id);
      tableData.data[index] = { ...query };
      return createResponse('success');
    },
  },
  // 新增项
  {
    url: EnumTableApi.LIST,
    method: 'post',
    response: (schema, request) => {
      const query = JSON.parse(request.requestBody);
      tableData.data.unshift({
        ...query,
        id: tableData.data.sort((a, b) => b.id - a.id)[0].id + 1,
        createTime: useDateFormat(useNow(), 'YYYY-MM-DD hh:mm:ss').value,
      });
      return createResponse('success');
    },
  },
  // 删除项
  {
    url: EnumTableApi.LIST,
    method: 'delete',
    response: (schema, request) => {
      const { id } = request.queryParams;
      tableData.data = tableData.data.filter((item) => item.id !== +id!);
      return createResponse('success');
    },
  },
];

export default tableMocks;
