"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { initialValues, LoginSchema, loginSchema } from "./Schema";
import { loginUser } from "@/client/auth.client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormInput } from "../ui/FormInput";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const hookForm = useForm<loginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: initialValues,
  });

  const { handleSubmit } = hookForm;

  const OnSubmit = async (data: loginSchema) => {
    try {
      setIsLoading(true);
      console.log(data);
      const res = await loginUser(data);
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Unexpectd error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">P</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Priscripto Admin
            </h1>
            <p className="text-gray-500">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(OnSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-[35%] -translate-y-1/2 h-5 w-5 text-gray-400" />
                <FormInput<loginSchema>
                  name="email"
                  HookForm={hookForm}
                  type="email"
                  placeholder="admin@priscripto.com"
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-[35%] -translate-y-1/2 h-5 w-5 text-gray-400" />
                <FormInput<loginSchema>
                  HookForm={hookForm}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[35%] -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>© 2026 Priscripto. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
