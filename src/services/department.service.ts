import cloudinary from "@/lib/cloudinary";
import { Department } from "@/models/Department";
import {
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
} from "@/types/department.types";

export const createDepartment = async (data: CreateDepartmentDTO) => {
  const existingDepartment = await Department.findOne({
    name: data.name,
    isDeleted: false,
  });

  if (existingDepartment) {
    throw new Error("DEPARTMENT_ALREADY_EXIST");
  }

  return await Department.create(data);
};

export const updateDepartment = async (
  id: string,
  data: UpdateDepartmentDTO,
) => {
  const updated = await Department.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  if (!updated) {
    throw new Error("DEPARTMENT_NOT_FOUND");
  }

  return updated;
};

export const deleteDepartment = async (id: string) => {
  const department = await Department.findById(id);

  if (!department) {
    throw new Error("DEPARTMENT_NOT_FOUND");
  }

  if (department.departmentPublicId) {
    await cloudinary.uploader.destroy(department.departmentPublicId);
  }

  department.isActive = false;
  department.isDeleted = true;

  await department.save();

  return department;
};

export const getActiveDepartments = async () => {
  return await Department.find({
    isActive: true,
    isDeleted: false,
  }).lean();
};
