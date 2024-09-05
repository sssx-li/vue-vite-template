export * from './user';
export * from './table';

export interface IFetchParams {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}

// 表格返回信息
export interface ITableRes<T = any> {
  data: T[];
  count: number;
}
