"use client";
import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Building2,
  X,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ImageWithFallback } from "@/helpers/ImageWithFallback";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { DepartmentSchema, departmentType, initialValues } from "./Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cloudnaryUploader,
  uploadDepartmentIamgeToCloudnary,
} from "@/client/common.client";
import { toast } from "sonner";
import Image from "next/image";
import { CreateDepartmentDTO } from "@/types/department.types";
import { createDepartment } from "@/client/department.client";

interface Department {
  id: number;
  name: string;
  description: string;
  image: string;
  doctorCount: number;
  patientCount: number;
}

const initialDepartments: Department[] = [
  {
    id: 1,
    name: "Cardiology",
    description: "Specialized in heart and cardiovascular system disorders",
    image:
      "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=300&fit=crop",
    doctorCount: 8,
    patientCount: 245,
  },
  {
    id: 2,
    name: "Neurology",
    description: "Treatment of nervous system and brain disorders",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    doctorCount: 6,
    patientCount: 189,
  },
  {
    id: 3,
    name: "Orthopedics",
    description: "Musculoskeletal system, bones, joints, and muscles care",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
    doctorCount: 10,
    patientCount: 312,
  },
  {
    id: 4,
    name: "Pediatrics",
    description: "Medical care for infants, children, and adolescents",
    image:
      "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=400&h=300&fit=crop",
    doctorCount: 7,
    patientCount: 428,
  },
];

const Departments = () => {
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deptImageURL, setDeptImageURL] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const hookForm = useForm<departmentType>({
    resolver: zodResolver(DepartmentSchema),
    defaultValues: initialValues,
  });

  const { handleSubmit } = hookForm;

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOpenModal = (department?: Department) => {
    if (department) {
      setEditingDepartment(department);
      setFormData({
        name: department.name,
        description: department.description,
        image: department.image,
      });
    } else {
      setEditingDepartment(null);
      setFormData({ name: "", description: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
    setFormData({ name: "", description: "", image: "" });
  };

  const OnSubmit = async (data: CreateDepartmentDTO) => {
    console.log(data);
    const res = await createDepartment(data);
    if (res.success) {
      toast.success("Department created successfully");
    } else {
      toast.error("Failed to create department");
    }

    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((dept) => dept.id !== id));
    }
  };

  const OnFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setIsUploading(true);
    const signedRes = await cloudnaryUploader();
    if (signedRes.success && signedRes.data) {
      try {
        const res = await uploadDepartmentIamgeToCloudnary(
          file,
          signedRes.data,
        );
        setDeptImageURL(res.secureUrl);
        hookForm.setValue("departmentImageUrl", res.secureUrl);
        hookForm.setValue("departmentPublicId", res.publicId);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.log(error);
        toast.error("Upload failed");
      }
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
            <p className="text-gray-500 mt-1">
              Manage hospital departments and specializations
            </p>
          </div>
          <Button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Department
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "pl-10 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              )}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-white border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Departments
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {departments.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Doctors</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {departments.reduce((sum, dept) => sum + dept.doctorCount, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Patients
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {departments.reduce((sum, dept) => sum + dept.patientCount, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Avg. Doctors/Dept
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {departments.length > 0
                  ? Math.round(
                      departments.reduce(
                        (sum, dept) => sum + dept.doctorCount,
                        0,
                      ) / departments.length,
                    )
                  : 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments.map((department) => (
          <Card
            key={department.id}
            className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Department Image */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-100">
              <ImageWithFallback
                src={department.image}
                alt={department.name}
                fill
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleOpenModal(department)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-sm"
                >
                  <Edit className="h-4 w-4 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(department.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-sm"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>

            {/* Department Info */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900">
                {department.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {department.description}
              </p>

              {/* Stats */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Doctors</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {department.doctorCount}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Patients</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {department.patientCount}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDepartments.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No departments found
          </h3>
          <p className="text-gray-500 mt-2">
            {searchQuery
              ? "Try adjusting your search query"
              : "Get started by creating a new department"}
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
              onClick={handleCloseModal}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-gray-100">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingDepartment ? "Edit Department" : "Add New Department"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(OnSubmit)} className="space-y-4">
                {/* Department Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Department Name
                  </Label>
                  <Input<departmentType>
                    name="name"
                    HookForm={hookForm}
                    type="text"
                    placeholder="e.g., Cardiology"
                    className="h-11"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700"
                  >
                    Description
                  </Label>
                  <Textarea
                    name="description"
                    HookForm={hookForm}
                    placeholder="Brief description of the department..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label
                    htmlFor="image"
                    className="text-sm font-medium text-gray-700"
                  >
                    Image
                  </Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="file"
                      disabled={isUploading}
                      onChange={OnFileUpload}
                      className={cn(
                        "pl-10 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                      )}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Upload an image</p>
                </div>

                {/* Image Preview */}
                {(deptImageURL.trim() !== "" || isUploading) && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Preview
                    </Label>
                    <div className="relative h-40 w-full rounded-lg overflow-hidden bg-gray-100">
                      {/* 🔄 Loader Overlay */}
                      {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                          <Loader2 className="h-8 w-8 text-white animate-spin" />
                        </div>
                      )}
                      {deptImageURL.trim() !== "" && (
                        <Image
                          key={deptImageURL} // forces refresh when URL changes
                          src={deptImageURL}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseModal}
                    className="flex-1 border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {editingDepartment ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
