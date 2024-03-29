import { createServer } from "miragejs";

import type { MethodTypes } from "./types";

const files = import.meta.glob("../mock/modules/**/*.ts");
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
        this[method as MethodTypes](
          url,
          response ? response : handler,
          options
        );
      }
      // 过滤其他(未定义)请求
      this.passthrough();
    },
  });
}
