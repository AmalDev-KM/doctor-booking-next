import { loginSchema } from "@/components/LoginForm/Schema";
import { apiRequest } from "@/lib/apiClient";
import { LoginResponse } from "@/types/apiResponse.types";

export const loginUser = (data: loginSchema) => {
  return apiRequest<LoginResponse>("post", "/auth/login", data);
};
