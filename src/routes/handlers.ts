// Import route mappings
import { validate } from "uuid";

// Errors
import {
  UnexpectedError,
  UUIDError,
  InvalidBodyError,
  ResourceNotFoundError,
  UnauthorizedError,
  ResourceHandlerNotFoundError,
} from "./errors";

// Mapping
import { ResourceKeys, resourceHandlers, ResourceHandler } from "@/routes/mapping";
import { MainTypes } from "@/types/cms";
import { NextRequest } from "next/server";

// =====================================================================================================
// Helper Functions
// =====================================================================================================

/**
 * Parses the provided slug into resource and optional ID.
 * @param slug - Array containing the resource name and optional ID.
 * @returns An object containing the resource and ID (if present).
 */
function parseSlug(slug: string[]): { resourceName: string; id?: string } {
  const [resourceName, id] = slug;
  return { resourceName, id };
}

/**
 * Validates the presence and format of an ID.
 * @param id - The ID to validate.
 * @param required - Whether the ID is required (default: false).
 * @throws If the ID is required but not provided or invalid.
 */
function validateId(id: string | undefined, required: boolean = false): void {
  if (required && !id) {
    throw new Error("ID is required for this action");
  }
  if (id && !validate(id)) {
    throw new UUIDError("Invalid Input: ID is not a valid UUID");
  }
}

/**
 * Validates that the body of a request is a valid object.
 * @param body - The request body to validate.
 * @throws If the body is not a valid object.
 */
function validateBody(body: unknown): void {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new InvalidBodyError("Invalid Input: Request body must be a valid object");
  }
}

/**
 * Retrieves the handlers for a specified resource from the resource mapping.
 * Validates the existence of the resource and returns the corresponding handlers.
 * @param resourceName - The name of the resource to retrieve handlers for.
 * @returns The handlers associated with the specified resource.
 * @throws ResourceNotFoundError if the resource does not exist in the mapping.
 */
function getResourceHandler(resourceName: string): ResourceHandler {
  if (!(resourceName in resourceHandlers)) {
    throw new ResourceHandlerNotFoundError(`Resource Handler '${resourceName}' not found`);
  }
  return resourceHandlers[resourceName as ResourceKeys];
}

// =====================================================================================================
// Get Helpers
// =====================================================================================================



// =====================================================================================================
// Handlers
// =====================================================================================================

/**
 * Handles GET requests for a resource.
 * @param request - The incoming HTTP request.
 * @param slug - The parsed slug containing resource and optional ID.
 * @returns The requested entity or list of entities.
 * @throws ResourceNotFoundError, NotFoundError, or UnexpectedError.
 */
export async function handleGetRequest(request: NextRequest, slug: string[]) {
  const { resourceName, id } = parseSlug(slug);

  const resourceHandler = getResourceHandler(resourceName);

  let entity: MainTypes | null = null;

  if (id) {
    validateId(id, true);
    try {
      entity = await resourceHandler.findById(id);
    } catch (error) {
      throw new UnexpectedError(
        `Unexpected error: Resource '${resourceName}' with ID '${id}' could not be found. Error: ${error}`
      );
    }
    if (!entity) {
      throw new ResourceNotFoundError(`Resource '${resourceName}' with ID '${id}' not found.`);
    }
    return entity;
  }
  else if (request.nextUrl.searchParams) {
    
    return resourceHandler.findAll();
  }
}

// =====================================================================================================

/**
 * Handles POST requests for a resource.
 * @param request - The incoming HTTP request.
 * @param slug - The parsed slug containing the resource.
 * @returns The newly created entity.
 * @throws ResourceNotFoundError, InvalidBodyError, or UnexpectedError.
 */
export async function handlePostRequest(request: NextRequest, slug: string[]) {
  const { resourceName } = parseSlug(slug);

  const resourceHandler = getResourceHandler(resourceName);
  const body = await request.json();

  validateBody(body);

  try {
    return resourceHandler.create(body);
  } catch (error) {
    throw new UnexpectedError(`Unexpected error: Resource '${resourceName}' could not be created. Error: ${error}`);
  }
}

// =====================================================================================================

/**
 * Handles PATCH requests for a resource.
 * @param request - The incoming HTTP request.
 * @param slug - The parsed slug containing resource and ID.
 * @returns The updated entity.
 * @throws ResourceNotFoundError, InvalidBodyError, or UnexpectedError.
 */
export async function handlePatchRequest(request: NextRequest, slug: string[]) {
  const { resourceName, id } = parseSlug(slug);

  validateId(id, true);

  const resourceHandler = getResourceHandler(resourceName);
  const body = await request.json();

  validateBody(body);

  try {
    return resourceHandler.update(id!, body);
  } catch (error) {
    throw new UnexpectedError(`Unexpected error: Resource '${resourceName}' could not be updated. Error: ${error}`);
  }
}

// =====================================================================================================

/**
 * Handles DELETE requests for a resource.
 * @param request - The incoming HTTP request.
 * @param slug - The parsed slug containing resource and ID.
 * @returns The result of the deletion operation.
 * @throws ResourceNotFoundError, UnauthorizedError, or UnexpectedError.
 */
export async function handleDeleteRequest(request: NextRequest, slug: string[]) {
  const { resourceName, id } = parseSlug(slug);

  validateId(id, true);

  const resourceHandler = getResourceHandler(resourceName);

  try {
    return resourceHandler.delete(id!);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
    throw new UnexpectedError(`Unexpected error: Resource '${resourceName}' could not be deleted. Error: ${error}`);
  }
}

// =====================================================================================================
