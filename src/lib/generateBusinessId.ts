import { Counter } from "@/models/Counter";

export const generateBusinessId = async (
  prefix: "AVL" | "APT"
): Promise<string> => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const datePart = `${year}${month}${day}`;
  const counterKey = `${prefix}-${datePart}`;

  const counter = await Counter.findOneAndUpdate(
    { key: counterKey },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const sequence = String(counter.seq).padStart(4, "0");

  return `${prefix}-${datePart}-${sequence}`;
};