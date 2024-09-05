export * from "./user";

export interface IFetchParams {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}
