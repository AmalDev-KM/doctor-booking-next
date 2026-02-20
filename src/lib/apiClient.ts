import { ApiResponse } from "@/types/response.types";
import axiosInstance from "./axios";

export async function apiRequest<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: unknown,
): Promise<ApiResponse<T>> {
  const response = await axiosInstance({
    method,
    url,
    data,
  });

  return response.data;
}
