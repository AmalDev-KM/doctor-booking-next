import { NextResponse } from "next/server";
import { ApiFailure, ApiSuccess } from "@/types/response.types";

export function successResponse<T>(
  data?: T,
  message = "Success",
  status = 200,
) {
  const body: ApiSuccess<T> = {
    success: true,
    message,
    data,
  };

  return NextResponse.json(body, { status });
}

export function errorResponse(
  message = "Something went wrong",
  status = 500,
  error?: unknown,
) {
  const body: ApiFailure = {
    success: false,
    message,
    error,
  };

  return NextResponse.json(body, { status });
}
