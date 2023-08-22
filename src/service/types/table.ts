export interface TableListItem {
  id: number;
  name: string;
  sex: 0 | 1;
  age: number;
  createTime: string;
}

export interface TableListRes<T = TableListItem> {
  data: T[];
  count: number;
}
