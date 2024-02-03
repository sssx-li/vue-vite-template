import { createFetch, CreateFetchOptions, UseFetchOptions } from "@vueuse/core";

import type { FeatchParams } from "./types";

class Fetch {
  instances;
  constructor(params: CreateFetchOptions) {
    const {
      baseUrl,
      combination = "chain",
      fetchOptions = {
        mode: "cors",
      },
      options,
    } = params;
    this.instances = createFetch({
      baseUrl,
      combination,
      options,
      fetchOptions,
    });
  }
  get(
    { url, params = {} }: Omit<FeatchParams, "data">,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ""}`,
      featOptions
    ).json();
  }
  post(
    { url, data, params = {} }: FeatchParams,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ""}`,
      featOptions
    )
      .post(data)
      .json();
  }
  put(
    { url, data, params = {} }: FeatchParams,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ""}`,
      featOptions
    )
      .put(data)
      .json();
  }
  patch(
    { url, data, params = {} }: FeatchParams,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ""}`,
      featOptions
    )
      .patch(data)
      .json();
  }
  delete(
    { url, params = {} }: FeatchParams,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ""}`,
      featOptions
    )
      .delete()
      .json();
  }
}

export default Fetch;
