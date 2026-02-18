import { deleteDepartmentController } from "@/controllers/department.controller";
import { withRole } from "@/middlewares/withRole";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  return withRole(req, ["admin"], async () => {
    return deleteDepartmentController(id);
  });
}
