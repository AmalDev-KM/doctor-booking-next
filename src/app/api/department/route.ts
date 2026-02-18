import {
  creatDepartmentController,
  getAllDepartmentsController,
} from "@/controllers/department.controller";
import { withAuth } from "@/middlewares/withAuth";
import { withRole } from "@/middlewares/withRole";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return withRole(req, ["admin"], async () => {
    return await creatDepartmentController(req);
  });
}

export async function GET(req: NextRequest) {
  return withAuth(req, async () => {
    return await getAllDepartmentsController();
  });
}
