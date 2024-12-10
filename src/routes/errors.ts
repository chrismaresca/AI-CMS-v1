export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  UPDATED = 202,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
}

// =====================================================================================================
// Errors
// =====================================================================================================

/**
 * Custom error for invalid UUIDs.
 */
export class UUIDError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UUIDError";
  }
}

/**
 * Custom error for when a resource is not found in the mapping.
 */
export class ResourceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResourceNotFoundError";
  }
}

/**
 * Custom error for when a resource handler is not found.
 */
export class ResourceHandlerNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResourceHandlerNotFoundError";
  }
}

/**
 * Custom error for invalid request body structure or content.
 */
export class InvalidBodyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidBodyError";
  }
}

/**
 * Custom error for unauthorized operations.
 */
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Generic error for unexpected situations.
 */
export class UnexpectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnexpectedError";
  }
}

// =====================================================================================================
// API Errors
// =====================================================================================================

export class BaseApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, new.target.prototype); // Maintain prototype chain
  }
}

export class ValidationError extends BaseApiError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, message);
    this.name = "ValidationError";
  }
}
