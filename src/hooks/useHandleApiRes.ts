export function useHandleApiRes<T = any>(promise: PromiseLike<any>) {
  return promise.then((res) => {
    const { data } = res;
    const { code, message, data: resData } = unref(data) || {};
    return {
      code,
      message,
      data: resData as T,
    };
  });
}
