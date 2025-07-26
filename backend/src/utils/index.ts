import { createError } from "@fastify/error";

export const UCUError              = createError("UCUError",              "UCU Error occurred: %s",       500);
export const UCUErrorUnauthorized  = createError("UCUErrorUnauthorized",  "UCU Unauthorized: %s",         401);
export const UCUErrorBadRequest    = createError("UCUErrorBadRequest",    "UCU Bad Request: %s",          400);
export const UCUErrorNotFound      = createError("UCUErrorNotFound",      "UCU Resource not found: %s",   404);
export const UCUErrorConflict      = createError("UCUErrorConflict",      "UCU Conflict: %s",             409);