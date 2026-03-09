import { getPendingDoctorProfilesForVerificationController } from "@/controllers/doctorProfile.controller";
import { withRole } from "@/middlewares/withRole";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return withRole(req, ["admin"], async () => {
    return getPendingDoctorProfilesForVerificationController();
  });
}

