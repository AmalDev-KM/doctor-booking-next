import mongoose, { Schema, Model, InferSchemaType } from "mongoose";
import { generateBusinessId } from "@/lib/generateBusinessId";

/* =====================================================
   Main Appointment Schema
===================================================== */

const AppointmentSchema = new Schema(
  {
    appointmentId: {
      type: String,
      unique: true,
      trim: true,
      index: true,
    },

    availabilityId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    doctorAvailabilityId: {
      type: Schema.Types.ObjectId,
      ref: "DoctorAvailability",
      required: true,
      index: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "DoctorProfile",
      required: true,
      index: true,
    },

    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    startTime: {
      type: String,
      required: true,
      trim: true,
    },

    endTime: {
      type: String,
      required: true,
      trim: true,
    },

    consultationMode: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
        "rejected",
        "rescheduled",
        "noShow",
      ],
      default: "confirmed",
    },

    cancellationReason: {
      type: String,
      trim: true,
    },

    cancelledBy: {
      type: String,
      enum: ["doctor", "patient", "admin"],
    },

    notes: {
      type: String,
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* =====================================================
   Hooks
===================================================== */

AppointmentSchema.pre("validate", async function () {
    const doc = this as mongoose.HydratedDocument<IAppointment>;
  
    if (!doc.appointmentId) {
      doc.appointmentId = await generateBusinessId("APT");
    }
  });

/* =====================================================
   Indexes
===================================================== */

AppointmentSchema.index(
  {
    doctorId: 1,
    date: 1,
    startTime: 1,
    endTime: 1,
  },
  { unique: true }
);

AppointmentSchema.index({ patientId: 1, date: -1 });
AppointmentSchema.index({ doctorId: 1, date: -1 });

/* =====================================================
   Infer Type Automatically
===================================================== */

export type IAppointment = InferSchemaType<typeof AppointmentSchema>;

/* =====================================================
   Prevent Model Overwrite (Hot Reload Safe)
===================================================== */

export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);