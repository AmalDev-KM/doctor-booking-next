import { connectDB } from "@/lib/db";
import {
  createDepartment,
  updateDepartment,
} from "@/services/department.service";
import { CreateDepartmentDTO } from "@/types/department.types";
import { errorResponse, successResponse } from "@/utils/responses";
import {
  departmentSchema,
  updateDepartmentSchema,
} from "@/validations/department.validation";
import { NextRequest, NextResponse } from "next/server";

//create a new department
export const creatDepartmentController = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { error, value } = departmentSchema.validate(body);

    if (error) {
      return errorResponse(error.details[0].message, 400);
    }

    await connectDB();

    const department = await createDepartment(value as CreateDepartmentDTO);

    return successResponse(department, "Department cretaed successfully", 201);
  } catch (error) {
    console.error("Error in createDepartment ", error);
    if (error instanceof Error) {
      if (error.message === "DEPARTMENT_ALREADY_EXIST") {
        return errorResponse("Department with this name already exists", 409);
      }
      return errorResponse(error.message, 500);
    }
    return errorResponse("Unexpected server error", 500);
  }
};

//update new department
export const updateDepartmentController = async (
  req: NextRequest,
  id: string,
): Promise<NextResponse> => {
  try {
    const body = await req.json();

    const { error, value } = updateDepartmentSchema.validate(body);

    if (error) {
      return errorResponse(error.details[0].message, 400);
    }

    await connectDB();

    const updated = await updateDepartment(id, value);

    return successResponse(updated, "Department updated", 201);
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message === "DEPARTMENT_NOT_FOUND") {
        return errorResponse("Department not found", 404);
      }

      return errorResponse(err.message, 500);
    }

    return errorResponse("Unexpected error", 500);
  }
};
