import { createServer } from 'miragejs';
import { TMethods } from './types';

const files = import.meta.glob('../mock/modules/**/*.ts');
const mockData: any[] = [];

export async function setupMock() {
  for (const key in files) {
    const res: any = await files[key]();
    res && res.default && mockData.push(...res.default);
  }
  createServer({
    routes() {
      this.namespace = import.meta.env.VITE_BASE_URL;
      for (let i = 0; i < mockData.length; i++) {
        const { url, method, response, options, handler } = mockData[i];
        this[method as TMethods](url, response ? response : handler, options);
      }
      // 过滤其它请求
      this.passthrough();
    },
  });
}
