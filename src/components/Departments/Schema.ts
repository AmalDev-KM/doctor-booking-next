import z from "zod";

export const DepartmentSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Department name is required"),
  description: z.string().optional(),
  departmentImageUrl: z.string().optional(),
  departmentPublicId: z.string().optional(),
});

export type departmentType = z.infer<typeof DepartmentSchema>;

export const initialValues: departmentType = {
  _id: "",
  name: "",
  description: "",
  departmentImageUrl: "",
  departmentPublicId: "",
};
