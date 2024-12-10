// =====================================================================================================
// Imports
// =====================================================================================================

import { NextRequest, NextResponse } from "next/server";

// Types
import { Params } from "@/types/base";

// Handlers
import { handleGetRequest, handlePostRequest, handlePatchRequest, handleDeleteRequest } from "@/routes/handlers";

// Errors
import {
  HttpStatus,
  UUIDError,
  UnexpectedError,
  InvalidBodyError,
  UnauthorizedError,
  ResourceNotFoundError,
} from "@/routes/errors";

// =====================================================================================================
// Error Handling
// =====================================================================================================

/**
 * Centralized function to handle errors for all API requests.
 * @param error - The error object caught in the request handlers.
 * @returns A standardized JSON response with the appropriate status code and message.
 */
function handleErrors(error: Error) {
  if (error instanceof InvalidBodyError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.BAD_REQUEST });
  }

  if (error instanceof UUIDError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.BAD_REQUEST });
  }

  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.METHOD_NOT_ALLOWED });
  }

  if (error instanceof ResourceNotFoundError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.NOT_FOUND });
  }

  if (error instanceof UnexpectedError) {
    return NextResponse.json({ error: error.message }, { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }

  // Fallback for unexpected errors
  return NextResponse.json(
    { error: "An internal server error occurred", details: error.message },
    { status: HttpStatus.INTERNAL_SERVER_ERROR }
  );
}

// =====================================================================================================
// GET Request
// =====================================================================================================

export async function GET(request: NextRequest, segmentData: { params: Params }) {
  const { slug } = await segmentData.params;

  try {
    const entity = await handleGetRequest(request, slug);
    return NextResponse.json(entity, { status: HttpStatus.OK });
  } catch (error) {
    return handleErrors(error as Error);
  }
}

// =====================================================================================================
// POST Request
// =====================================================================================================

export async function POST(request: NextRequest, segmentData: { params: Params }) {
  const { slug } = await segmentData.params;

  try {
    const entity = await handlePostRequest(request, slug);
    return NextResponse.json(entity, { status: HttpStatus.CREATED });
  } catch (error) {
    return handleErrors(error as Error);
  }
}

// =====================================================================================================
// PATCH Request
// =====================================================================================================

export async function PATCH(request: NextRequest, segmentData: { params: Params }) {
  const { slug } = await segmentData.params;

  try {
    const updatedEntity = await handlePatchRequest(request, slug);
    return NextResponse.json(updatedEntity, { status: HttpStatus.UPDATED });
  } catch (error) {
    return handleErrors(error as Error);
  }
}

// =====================================================================================================
// DELETE Request
// =====================================================================================================

export async function DELETE(request: NextRequest, segmentData: { params: Params }) {
  const { slug } = await segmentData.params;

  try {
    const result = await handleDeleteRequest(request, slug);
    return NextResponse.json(result, { status: HttpStatus.OK });
  } catch (error) {
    return handleErrors(error as Error);
  }
}
