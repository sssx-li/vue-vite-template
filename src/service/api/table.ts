export function apiTableGetList(name = '') {
  return ApiRequest.get({
    url: EnumTableApi.LIST,
    params: { name },
  });
}
