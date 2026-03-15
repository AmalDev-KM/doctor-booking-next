import mongoose, { Schema, Model, InferSchemaType } from "mongoose";

const CounterSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    seq: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export type ICounter = InferSchemaType<typeof CounterSchema>;

export const Counter: Model<ICounter> =
  mongoose.models.Counter ||
  mongoose.model<ICounter>("Counter", CounterSchema);