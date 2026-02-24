import { apiRequest } from "@/lib/apiClient";
import {
  CreateDepartmentDTO,
  createDepartmentResponse,
} from "@/types/department.types";

export const createDepartment = async (data: CreateDepartmentDTO) => {
  return apiRequest<createDepartmentResponse>("post", "/department", data);
};
