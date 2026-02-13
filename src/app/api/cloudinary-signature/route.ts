import { cloudnaryCredentialsController } from "@/controllers/common.controller";
import { withAuth } from "@/middlewares/withAuth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return withAuth(req, async () => {
    return await cloudnaryCredentialsController();
  });
}
