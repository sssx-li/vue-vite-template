export * from "./user";

export interface FeatchParams {
  url: string;
  params?: Record<string, any>;
  data?: Record<string, any>;
}
