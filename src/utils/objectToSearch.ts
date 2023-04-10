export function objectToSearch(params: Record<string, any>) {
  let searchParams = '';
  if (Object.keys(params).length > 0) {
    for (const key in params) {
      searchParams += `${key}=${params[key]}&`;
    }
    searchParams = searchParams.slice(0, searchParams.length - 1);
  }
  return searchParams;
}
