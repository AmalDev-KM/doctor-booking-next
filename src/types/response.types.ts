export interface ApiSuccess<T> {
  success: true;
  message: string;
  data?: T;
}

export interface ApiFailure {
  success: false;
  message: string;
  error?: unknown;
}


// ✅ Union type (main response type)
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure