import { Response, Request } from 'miragejs';
import { HandlerOptions, RouteHandler } from 'miragejs/server';

import { AnyRegistry } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export type MethodTypes =
  | 'get'
  | 'put'
  | 'post'
  | 'patch'
  | 'delete'
  | 'options'
  | 'head';

export type TApis = 'user';
export interface MockItem {
  method: MethodTypes;
  url: string;
  response?: (schema: Schema<AnyRegistry>, request: Request) => any;
  handler?: RouteHandler<AnyRegistry, Response>;
  options?: HandlerOptions;
}
