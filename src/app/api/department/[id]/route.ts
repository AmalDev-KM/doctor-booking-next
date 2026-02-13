import { NextRequest } from "next/server";
import { withRole } from "@/middlewares/withRole";
import { updateDepartmentController } from "@/controllers/department.controller";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  return withRole(req, ["admin"], async () => {
    return updateDepartmentController(req, id);
  });
}
