export * from './user';
export * from './table';

export interface FeatchParams {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}
