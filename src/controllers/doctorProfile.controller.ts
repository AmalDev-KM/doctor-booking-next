import { connectDB } from "@/lib/db";
import { DoctorProfile } from "@/models/DoctorProfile";
import {
  upsertDoctorBasicInfo,
  upsertDoctorProfessionalInfo,
  upsertDoctorQualifications,
  upsertDoctorClinics,
  getPendingDoctorProfilesForVerification,
} from "@/services/doctorProfile.service";
import { errorResponse, successResponse } from "@/utils/responses";
import {
  doctorBasicInfoSchema,
  doctorProfessionalInfoSchema,
  doctorQualificationsSchema,
  doctorClinicsSchema,
} from "@/validations/doctorProfile.validation";
import { NextRequest, NextResponse } from "next/server";

export async function upsertDoctorBasicInfoController(
  req: NextRequest,
  userId: string,
): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { error, value } = doctorBasicInfoSchema.validate(body);

    if (error) {
      return errorResponse(error.details[0].message, 400);
    }

    await connectDB();

    const profile = await upsertDoctorBasicInfo(userId, value);

    return successResponse(profile, "Basic info saved successfully", 201);
  } catch (err: unknown) {
    console.error("Error in upsertDoctorBasicInfoController:", err);
    if (err instanceof Error) {
      return errorResponse(err.message, 500);
    }
    return errorResponse("Unexpected server error", 500);
  }
}

export async function upsertDoctorProfessionalInfoController(
  req: NextRequest,
  userId: string,
): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { error, value } = doctorProfessionalInfoSchema.validate(body);

    if (error) {
      return errorResponse(error.details[0].message, 400);
    }

    await connectDB();

    const existingProfile = await DoctorProfile.findOne({ userId }).select(
      "basicInfo",
    );

    if (
      !existingProfile ||
      !existingProfile.basicInfo ||
      !existingProfile.basicInfo.firstName ||
      !existingProfile.basicInfo.lastName ||
      !existingProfile.basicInfo.phoneNumber ||
      !existingProfile.basicInfo.email
    ) {
      return errorResponse(
        "Please complete basic info before adding professional info",
        400,
      );
    }

    const profile = await upsertDoctorProfessionalInfo(userId, value);

    return successResponse(profile, "Professional info saved successfully", 201);
  } catch (err: unknown) {
    console.error("Error in upsertDoctorProfessionalInfoController:", err);
    if (err instanceof Error) {
      return errorResponse(err.message, 500);
    }
    return errorResponse("Unexpected server error", 500);
  }
}

export async function upsertDoctorQualificationsController(
  req: NextRequest,
  userId: string,
): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { error, value } = doctorQualificationsSchema.validate(body);

    if (error) {
      return errorResponse(error.details[0].message, 400);
    }

    await connectDB();

    const existingProfile = await DoctorProfile.findOne({ userId }).select(
      "basicInfo professionalInfo",
    );

    if (
      !existingProfile ||
      !existingProfile.basicInfo ||
      !existingProfile.basicInfo.firstName ||
      !existingProfile.basicInfo.lastName ||
      !existingProfile.basicInfo.phoneNumber ||
      !existingProfile.basicInfo.email
    ) {
      return errorResponse(
        "Please complete basic info before adding qualifications",
        400,
      );
    }

    if (
      !existingProfile.professionalInfo ||
      !existingProfile.professionalInfo.specialization ||
      !existingProfile.professionalInfo.medicalRegistrationNumber ||
      existingProfile.professionalInfo.consultationFee == null
    ) {
      return errorResponse(
        "Please complete professional info before adding qualifications",
        400,
      );
    }

    const profile = await upsertDoctorQualifications(userId, value);

    return successResponse(profile, "Qualifications saved successfully", 201);
  } catch (err: unknown) {
    console.error("Error in upsertDoctorQualificationsController:", err);
    if (err instanceof Error) {
      return errorResponse(err.message, 500);
    }
    return errorResponse("Unexpected server error", 500);
  }
}

export async function upsertDoctorClinicsController(
  req: NextRequest,
  userId: string,
): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { error, value } = doctorClinicsSchema.validate(body);

    if (error) {
      return errorResponse(error.details[0].message, 400);
    }

    await connectDB();

    const existingProfile = await DoctorProfile.findOne({ userId }).select(
      "basicInfo professionalInfo qualifications",
    );

    if (
      !existingProfile ||
      !existingProfile.basicInfo ||
      !existingProfile.basicInfo.firstName ||
      !existingProfile.basicInfo.lastName ||
      !existingProfile.basicInfo.phoneNumber ||
      !existingProfile.basicInfo.email
    ) {
      return errorResponse(
        "Please complete basic info before adding clinic details",
        400,
      );
    }

    if (
      !existingProfile.professionalInfo ||
      !existingProfile.professionalInfo.specialization ||
      !existingProfile.professionalInfo.medicalRegistrationNumber ||
      existingProfile.professionalInfo.consultationFee == null
    ) {
      return errorResponse(
        "Please complete professional info before adding clinic details",
        400,
      );
    }

    if (
      !existingProfile.qualifications ||
      !Array.isArray(existingProfile.qualifications) ||
      existingProfile.qualifications.length === 0
    ) {
      return errorResponse(
        "Please add at least one qualification before adding clinic details",
        400,
      );
    }

    const profile = await upsertDoctorClinics(userId, value);

    return successResponse(profile, "Clinics saved successfully", 201);
  } catch (err: unknown) {
    console.error("Error in upsertDoctorClinicsController:", err);
    if (err instanceof Error) {
      return errorResponse(err.message, 500);
    }
    return errorResponse("Unexpected server error", 500);
  }
}

export const getPendingDoctorProfilesForVerificationController =
  async (): Promise<NextResponse> => {
    try {
      await connectDB();

      const profiles = await getPendingDoctorProfilesForVerification();

      const result = profiles.map((profile) => ({
        doctorProfileId: profile._id,
        userId: profile.userId,
        firstName: profile.basicInfo?.firstName ?? "",
        lastName: profile.basicInfo?.lastName ?? "",
        profileImageUrl: profile.basicInfo?.profileImageUrl ?? "",
        email: profile.basicInfo?.email ?? "",
      }));

      return successResponse(
        result,
        "Pending doctor profiles fetched successfully",
        200,
      );
    } catch (error: unknown) {
      console.error(
        "Error in getPendingDoctorProfilesForVerificationController:",
        error,
      );
      if (error instanceof Error) {
        return errorResponse(error.message, 500);
      }
      return errorResponse("Unexpected server error", 500);
    }
  };

