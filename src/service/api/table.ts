import { Table } from '.';
import { Request } from '..';

export function getTableData(name = '') {
  return Request.get({
    url: Table.LIST,
    params: { name },
  });
}
