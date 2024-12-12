import type { H3Event } from "h3";

export enum HttpCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  TeaPot = 418,

  ServerError = 500,
}

export interface HttpError {
  code?: HttpCode;
  message?: string;
}

export type HttpRequest = H3Event<Request>;
