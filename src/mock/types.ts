import { Response } from 'miragejs';
import { HandlerOptions } from 'miragejs/server';

import { AnyRegistry } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export type TMethods =
  | 'get'
  | 'post'
  | 'patch'
  | 'put'
  | 'options'
  | 'del'
  | 'head'
  | 'delete';

export type TApis = 'user';
export interface IMock {
  method: TMethods;
  url: string;
  response?: () => void;
  handler?: (schema: Schema<AnyRegistry>, request: Request) => Response;
  options?: HandlerOptions;
}
