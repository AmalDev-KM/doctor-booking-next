import mongoose, { Schema, Model, InferSchemaType } from "mongoose";
import { generateBusinessId } from "@/lib/generateBusinessId";

/* =====================================================
   Slot Sub Schema
===================================================== */

const AvailabilitySlotSchema = new Schema(
  {
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

    slotStatus: {
      type: String,
      enum: ["active", "disabled", "booked"],
      default: "active",
    },

    consultationMode: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },
  },
  { _id: false },
);

/* =====================================================
   Main Doctor Availability Schema
===================================================== */

const DoctorAvailabilitySchema = new Schema(
  {
    availabilityId: {
      type: String,
      unique: true,
      trim: true,
      index: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "DoctorProfile",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    startingTime: {
      type: String,
      required: true,
      trim: true,
    },

    endingTime: {
      type: String,
      required: true,
      trim: true,
    },

    slotDurationInMinutes: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["active", "disabled", "completed", "cancelled"],
      default: "active",
    },

    slots: {
      type: [AvailabilitySlotSchema],
      default: [],
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

/* =====================================================
   Hooks
===================================================== */

DoctorAvailabilitySchema.pre("validate", async function () {
  const doc = this as mongoose.HydratedDocument<IDoctorAvailability>;

  if (!doc.availabilityId) {
    doc.availabilityId = await generateBusinessId("AVL");
  }
});

/* =====================================================
   Indexes
===================================================== */

DoctorAvailabilitySchema.index({ doctorId: 1, date: 1 });

DoctorAvailabilitySchema.index(
  {
    doctorId: 1,
    date: 1,
    startingTime: 1,
    endingTime: 1,
  },
  { unique: true },
);

/* =====================================================
   Infer Type Automatically
===================================================== */

export type IDoctorAvailability = InferSchemaType<
  typeof DoctorAvailabilitySchema
>;

/* =====================================================
   Prevent Model Overwrite (Hot Reload Safe)
===================================================== */

export const DoctorAvailability: Model<IDoctorAvailability> =
  mongoose.models.DoctorAvailability ||
  mongoose.model<IDoctorAvailability>(
    "DoctorAvailability",
    DoctorAvailabilitySchema,
  );
