import type { Response, Request } from "miragejs";
import type { HandlerOptions, RouteHandler } from "miragejs/server";
import type { AnyRegistry } from "miragejs/-types";
import type Schema from "miragejs/orm/schema";

export type MethodTypes =
  | "get"
  | "put"
  | "post"
  | "patch"
  | "delete"
  | "options"
  | "head";

export type TApis = "user";
export interface MockItem {
  method: MethodTypes;
  url: string;
  response?: (schema: Schema<AnyRegistry>, request: Request) => any;
  handler?: RouteHandler<AnyRegistry, Response>;
  options?: HandlerOptions;
}
