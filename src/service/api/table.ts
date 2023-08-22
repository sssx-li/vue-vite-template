import { TableEnum } from '.';
import { Request } from '..';

export function getTableData(name = '') {
  return Request.get({
    url: TableEnum.LIST,
    params: { name },
  });
}
