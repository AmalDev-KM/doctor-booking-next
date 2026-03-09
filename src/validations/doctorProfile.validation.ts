import Joi from "joi";

export const doctorBasicInfoSchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(100).required(),
  lastName: Joi.string().trim().min(1).max(100).required(),
  gender: Joi.string().valid("Male", "Female", "Other").optional(),
  dateOfBirth: Joi.date().iso().optional(),
  profileImageUrl: Joi.string().uri().optional(),
  profileImagePublicId: Joi.string().optional(),
  phoneNumber: Joi.string().trim().min(6).max(20).required(),
  alternatePhoneNumber: Joi.string().trim().min(6).max(20).optional(),
  email: Joi.string().email().required(),
  bloodGroup: Joi.string().trim().optional(),
  languagesSpoken: Joi.array()
    .items(Joi.string().trim().min(1).max(50))
    .optional(),
  nationality: Joi.string().trim().optional(),
});

export const doctorProfessionalInfoSchema = Joi.object({
  specialization: Joi.string().trim().min(1).max(100).required(),
  superSpecialization: Joi.string().trim().min(1).max(100).optional(),
  totalExperience: Joi.number().min(0).max(100).optional(),
  medicalRegistrationNumber: Joi.string().trim().min(1).max(100).required(),
  medicalCouncil: Joi.string().trim().min(1).max(100).optional(),
  consultationFee: Joi.number().min(0).required(),
  emergencyFee: Joi.number().min(0).optional(),
  aboutDoctor: Joi.string().trim().max(2000).optional(),
  servicesOffered: Joi.array()
    .items(Joi.string().trim().min(1).max(100))
    .optional(),
  awards: Joi.array()
    .items(Joi.string().trim().min(1).max(200))
    .optional(),
  memberships: Joi.array()
    .items(Joi.string().trim().min(1).max(200))
    .optional(),
});

export const doctorQualificationsSchema = Joi.object({
  qualifications: Joi.array()
    .items(
      Joi.object({
        degree: Joi.string().trim().min(1).max(200).required(),
        fieldOfStudy: Joi.string().trim().min(1).max(200).optional(),
        university: Joi.string().trim().min(1).max(200).required(),
        collegeName: Joi.string().trim().min(1).max(200).optional(),
        yearOfCompletion: Joi.number()
          .integer()
          .min(1950)
          .max(new Date().getFullYear())
          .optional(),
        country: Joi.string().trim().min(1).max(100).optional(),
      }),
    )
    .min(1)
    .required(),
});

export const doctorClinicsSchema = Joi.object({
  clinics: Joi.array()
    .items(
      Joi.object({
        clinicName: Joi.string().trim().min(1).max(200).required(),
        addressLine1: Joi.string().trim().min(1).max(300).required(),
        addressLine2: Joi.string().trim().min(1).max(300).optional(),
        city: Joi.string().trim().min(1).max(100).required(),
        state: Joi.string().trim().min(1).max(100).required(),
        country: Joi.string().trim().min(1).max(100).required(),
        pincode: Joi.string().trim().min(1).max(20).optional(),
        landmark: Joi.string().trim().min(1).max(200).optional(),
        contactNumber: Joi.string().trim().min(6).max(20).optional(),
        facilities: Joi.array()
          .items(Joi.string().trim().min(1).max(100))
          .optional(),
        consultationMode: Joi.string()
          .valid("Offline", "Online", "Both")
          .optional(),
      }),
    )
    .min(1)
    .required(),
});


