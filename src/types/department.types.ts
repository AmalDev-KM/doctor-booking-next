export interface CreateDepartmentDTO {
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
