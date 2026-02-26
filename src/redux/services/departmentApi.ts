import { ApiResponse } from "@/types/response.types";
import { baseApi } from "./baseApi";
import {
  CreateDepartmentDTO,
  UpdateDepartment,
  createDepartmentResponse,
} from "../../types/department.types";

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 GET all departments
    getDepartments: builder.query<
      ApiResponse<createDepartmentResponse[]>,
      void
    >({
      query: () => ({
        url: "/department",
        method: "GET",
      }),
      providesTags: ["Department"],
    }),

    // 🔹 CREATE department
    createDepartment: builder.mutation<
      ApiResponse<createDepartmentResponse>,
      CreateDepartmentDTO
    >({
      query: (data) => ({
        url: "/department",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Department"],
    }),

    //update department
    updateDepartment: builder.mutation<
      ApiResponse<createDepartmentResponse>,
      UpdateDepartment
    >({
      query: ({ id, data }) => ({
        url: `/department/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Department"],
    }),

    // 🔹 DELETE department
    deleteDepartment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/department/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentApi;
