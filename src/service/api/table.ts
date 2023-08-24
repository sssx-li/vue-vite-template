export function getTableData(name = '') {
  return ApiRequest.get({
    url: TableEnum.LIST,
    params: { name },
  });
}
