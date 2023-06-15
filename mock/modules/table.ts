import Mock from 'mockjs';
import { Table } from '@/service/api';
import { IMock } from 'mock/types';
import { createResponse } from '../utils';
import { ITableList, ITableRes } from '@/service/types/table';

const tableData: { data: ITableList[] } = Mock.mock({
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

const tableMocks: IMock[] = [
  {
    url: Table.LIST,
    method: 'get',
    response: (schema, request) => {
      const { name, currentPage, pageSize } = request.queryParams;
      const resData = JSON.parse(JSON.stringify(tableData));
      resData.data = tableData.data
        .filter((item) => {
          if (!name) return true;
          return item.name.indexOf(name) !== -1;
        })
        .slice(
          (parseInt(currentPage) - 1) * parseInt(pageSize),
          parseInt(currentPage) * parseInt(pageSize)
        );
      resData.count = tableData.data.length;
      return createResponse<ITableRes>(resData);
    },
  },
  {
    url: Table.LIST,
    method: 'put',
    response: (schema, request) => {
      const query = JSON.parse(request.requestBody);
      for (let index = 0; index < tableData.data.length; index++) {
        const item = tableData.data[index];
        if (item.id === query.id) {
          tableData.data[index] = { ...query };
          break;
        }
      }
      return createResponse('success');
    },
  },
  {
    url: Table.LIST,
    method: 'post',
    response: (schema, request) => {
      const query = JSON.parse(request.requestBody);
      console.log('query', query);
      tableData.data.unshift({
        ...query,
        id: tableData.data.sort((a, b) => b.id - a.id)[0].id + 1,
        createTime: useDateFormat(useNow(), 'YYYY-MM-DD hh:mm:ss').value,
      });
      console.log('tableData.data', tableData.data);
      return createResponse('success');
    },
  },
  {
    url: Table.LIST,
    method: 'delete',
    response: (schema, request) => {
      const { id } = request.queryParams;
      tableData.data = tableData.data.filter(
        (item) => item.id !== parseInt(id)
      );
      return createResponse('success');
    },
  },
];

export default tableMocks;
