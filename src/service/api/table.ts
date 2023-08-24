export function tableGetList(name = '') {
  return ApiRequest.get({
    url: TableEnum.LIST,
    params: { name },
  });
}
