export interface TableItem {
  id: number;
  name: string;
  sex: 0 | 1;
  age: number;
  createTime: string;
}

export interface TableDataRes<T = TableItem> {
  data: T[];
  count: number;
}
