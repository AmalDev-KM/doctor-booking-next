import { approveDoctorProfileController } from "@/controllers/doctorProfile.controller";
import { withRole } from "@/middlewares/withRole";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return withRole(req, ["admin"], async () => {
    return approveDoctorProfileController(req);
  });
}

