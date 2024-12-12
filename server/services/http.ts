import type { HttpError, HttpRequest } from "~/types/http";
import { HttpCode } from "~/types/http";

export function error(event: HttpRequest, payload: HttpError) {
  return sendError(event, createError({
    statusCode: payload.code ?? HttpCode.ServerError,
    statusMessage: payload.message ?? "Internal server error occured, try again.",
  }));
}
