import Mock from 'mockjs';
import { Table } from '@/service/api';
import { IMock } from 'mock/types';
import { createResponse } from '../utils';
import { ITableList, ITableRes } from '@/service/types/table';

const tableData: { data: ITableList[] } = Mock.mock({
  'data|10': [
    {
      name: '@cname',
      'sex|1': [0, 1],
      age: /^[1-9][0-9]$/,
      createTime: '@datetime',
    },
  ],
});

const tableMocks: IMock[] = [
  {
    url: Table.LIST,
    method: 'get',
    response: (schema, request) => {
      const { name } = request.queryParams;
      let list = tableData.data;
      if (name) {
        list = tableData.data.filter((item) => item.name.includes(name));
      }
      return createResponse<ITableRes>({
        data: list,
        count: list.length,
      });
    },
  },
];

export default tableMocks;
