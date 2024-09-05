import type Schema from 'miragejs/orm/schema';
import type { Response, Request } from 'miragejs';
import type { HandlerOptions, RouteHandler } from 'miragejs/server';
import type { AnyRegistry } from 'miragejs/-types';

export type TMethodTypes =
  | 'get'
  | 'put'
  | 'post'
  | 'patch'
  | 'delete'
  | 'options'
  | 'head';

export interface IMockItem {
  method: TMethodTypes;
  url: string;
  response?: (schema: Schema<AnyRegistry>, request: Request) => any;
  handler?: RouteHandler<AnyRegistry, Response>;
  options?: HandlerOptions;
}
