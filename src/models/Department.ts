import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

const DepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    departmentImageUrl: {
      type: String,
    },
    departmentPublicId: {
      type: String,
    },
    doctorCount: {
      type: Number,
      default: 0,
    },
    patientCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
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

export type IDepartment = InferSchemaType<typeof DepartmentSchema>;

export const Department: Model<IDepartment> =
  mongoose.models.Department ||
  mongoose.model<IDepartment>("Department", DepartmentSchema);
