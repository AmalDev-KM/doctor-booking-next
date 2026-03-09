import { upsertDoctorClinicsController } from "@/controllers/doctorProfile.controller";
import { withRole } from "@/middlewares/withRole";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return withRole(req, ["doctor"], async (user) => {
    return upsertDoctorClinicsController(req, user._id);
  });
}

