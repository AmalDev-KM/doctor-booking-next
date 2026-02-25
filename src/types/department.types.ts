export interface CreateDepartmentDTO {
  _id?: string;
  name: string;
  description?: string;
  departmentImageUrl?: string;
  departmentPublicId?: string;
}

export interface createDepartmentResponse {
  name: string;
  description: string;
  departmentImageUrl: string;
  departmentPublicId: string;
  doctorCount: number;
  patientCount: number;
  isActive: boolean;
  isDeleted: boolean;
  _id: string;
}

export interface UpdateDepartmentDTO {
  name?: string;
  description?: string;
  departmentImageUrl?: string;
}

export interface UpdateDepartment {
  id: string;
  data: Partial<CreateDepartmentDTO>;
}
