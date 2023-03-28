export function useHandleApiRes(promise: PromiseLike<any>) {
  return promise.then((res) => {
    const { isFinished, data, abort, aborted, canAbort, statusCode, execute } =
      res;
    const { code, message, data: resData } = unref(data) || {};
    return {
      isFinished,
      code,
      message,
      data: resData,
      abort,
      aborted,
      canAbort,
      statusCode,
      execute,
    };
  });
}
