import { DoctorProfile } from "@/models/DoctorProfile";
import {
  DoctorBasicInfoDTO,
  DoctorProfessionalInfoDTO,
  DoctorQualificationsDTO,
  DoctorClinicsDTO,
} from "@/types/doctorProfile.types";

export async function upsertDoctorBasicInfo(
  userId: string,
  data: DoctorBasicInfoDTO,
) {
  const update = {
    $setOnInsert: { userId },
    $set: { basicInfo: data },
  };

  return DoctorProfile.findOneAndUpdate({ userId }, update, {
    upsert: true,
    returnDocument: "after",
    runValidators: true,
  });
}

export async function upsertDoctorProfessionalInfo(
  userId: string,
  data: DoctorProfessionalInfoDTO,
) {
  const update = {
    $setOnInsert: { userId },
    $set: { professionalInfo: data },
  };

  return DoctorProfile.findOneAndUpdate({ userId }, update, {
    upsert: true,
    returnDocument: "after",
    runValidators: true,
  });
}

export async function upsertDoctorQualifications(
  userId: string,
  data: DoctorQualificationsDTO,
) {
  const update = {
    $setOnInsert: { userId },
    $set: { qualifications: data.qualifications },
  };

  return DoctorProfile.findOneAndUpdate({ userId }, update, {
    upsert: true,
    returnDocument: "after",
    runValidators: true,
  });
}

export async function upsertDoctorClinics(
  userId: string,
  data: DoctorClinicsDTO,
) {
  const update = {
    $setOnInsert: { userId },
    $set: { clinics: data.clinics, isProfileCompleted: true },
  };

  return DoctorProfile.findOneAndUpdate({ userId }, update, {
    upsert: true,
    returnDocument: "after",
    runValidators: true,
  });
}

export async function getPendingDoctorProfilesForVerification() {
  return DoctorProfile.find({
    verificationStatus: "pending",
    isDeleted: false,
  }).select(
    "_id userId basicInfo.firstName basicInfo.lastName basicInfo.profileImageUrl basicInfo.email",
  );
}

export async function approveDoctorProfile(
  doctorProfileId: string,
  departmentId: string,
) {
  const profile = await DoctorProfile.findOne({
    _id: doctorProfileId,
    isDeleted: false,
  }).select("isProfileCompleted");

  if (!profile) {
    throw new Error("DOCTOR_PROFILE_NOT_FOUND");
  }

  if (!profile.isProfileCompleted) {
    throw new Error("DOCTOR_PROFILE_NOT_COMPLETED");
  }

  const updated = await DoctorProfile.findOneAndUpdate(
    { _id: doctorProfileId, isDeleted: false },
    {
      $set: {
        departmentId,
        verificationStatus: "approved",
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!updated) {
    throw new Error("DOCTOR_PROFILE_NOT_FOUND");
  }

  return updated;
}

