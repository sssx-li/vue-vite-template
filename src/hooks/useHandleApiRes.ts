export function useHandleApiRes<T = any>(promise: PromiseLike<any>) {
  return promise.then((res) => {
    const { code, message, data: resData } = unref(res.data) || {};
    return {
      code,
      message,
      data: resData as T,
    };
  });
}
