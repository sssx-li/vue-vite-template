export * from './user';
export * from './table';

export interface FeatchParams {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

// 表格返回信息
export interface TableRes<T = any> {
  data: T[];
  count: number;
}
