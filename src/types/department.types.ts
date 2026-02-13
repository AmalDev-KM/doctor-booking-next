export interface CreateDepartmentDTO {
  name: string;
  description?: string;
  departmentImageUrl?: string;
}


export interface UpdateDepartmentDTO {
  name?: string;
  description?: string;
  departmentImageUrl?: string;
}