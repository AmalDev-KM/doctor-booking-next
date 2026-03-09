export type Gender = "Male" | "Female" | "Other";
export type ConsultationMode = "Offline" | "Online" | "Both";

export interface DoctorBasicInfoDTO {
  firstName: string;
  lastName: string;
  gender?: Gender;
  dateOfBirth?: string | Date;
  profileImageUrl?: string;
  profileImagePublicId?: string;
  phoneNumber: string;
  alternatePhoneNumber?: string;
  email: string;
  bloodGroup?: string;
  languagesSpoken?: string[];
  nationality?: string;
}

export interface DoctorProfessionalInfoDTO {
  specialization: string;
  superSpecialization?: string;
  totalExperience?: number;
  medicalRegistrationNumber: string;
  medicalCouncil?: string;
  consultationFee: number;
  emergencyFee?: number;
  aboutDoctor?: string;
  servicesOffered?: string[];
  awards?: string[];
  memberships?: string[];
}

export interface DoctorQualificationDTO {
  degree: string;
  fieldOfStudy?: string;
  university: string;
  collegeName?: string;
  yearOfCompletion?: number;
  country?: string;
}

export interface DoctorQualificationsDTO {
  qualifications: DoctorQualificationDTO[];
}

export interface DoctorClinicDTO {
  clinicName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode?: string;
  landmark?: string;
  contactNumber?: string;
  facilities?: string[];
  consultationMode?: ConsultationMode;
}

export interface DoctorClinicsDTO {
  clinics: DoctorClinicDTO[];
}


