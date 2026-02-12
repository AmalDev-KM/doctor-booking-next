import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  DOCTOR = "doctor",
  PATIENT = "patient",
}

/*
  Schema
*/
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // Exclude password from query results by default
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.PATIENT,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

/*
  Infer Type Automatically
*/
export type IUser = InferSchemaType<typeof UserSchema>;

/*
  Prevent model overwrite during hot reload
*/
export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
