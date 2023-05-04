export function createResponse<T = any>(
  resData: any,
  code = 0,
  message = 'success'
) {
  return {
    code,
    data: resData as T,
    message,
  };
}
