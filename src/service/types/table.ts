export interface ITableList {
  id: number;
  name: string;
  sex: 0 | 1;
  age: number;
  createTime: string;
}

export interface ITableRes<T = ITableList> {
  data: T[];
  count: number;
}
