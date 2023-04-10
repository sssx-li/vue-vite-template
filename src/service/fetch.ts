import { createFetch, CreateFetchOptions, UseFetchOptions } from '@vueuse/core';
import { objectToSearch } from '@/utils';

import type { IFeatchParams } from './types';

class Fetch {
  instances;
  constructor(params: CreateFetchOptions) {
    const {
      baseUrl,
      combination = 'chain',
      fetchOptions = {
        mode: 'cors',
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
    { url, params = {} }: Omit<IFeatchParams, 'data'>,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(
      `${url}${objectToSearch(params) ? `?${objectToSearch(params)}` : ''}`,
      featOptions
    ).json();
  }
  post(
    { url, data }: Omit<IFeatchParams, 'params'>,
    featOptions: UseFetchOptions = {}
  ) {
    return this.instances(url, featOptions).post(data).json();
  }
  put({ url, data }: IFeatchParams, featOptions: UseFetchOptions = {}) {
    return this.instances(url, featOptions).put(data).json();
  }
  patch({ url, data }: IFeatchParams, featOptions: UseFetchOptions = {}) {
    return this.instances(url, featOptions).patch(data).json();
  }
  delete({ url }: IFeatchParams, featOptions: UseFetchOptions = {}) {
    return this.instances(url, featOptions).delete().json();
  }
}

export default Fetch;
