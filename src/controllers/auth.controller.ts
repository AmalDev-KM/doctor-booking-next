import { connectDB } from "@/lib/db";
import { login, registerUser } from "@/services/auth.service";
import { errorResponse, successResponse } from "@/utils/responses";
import { loginSchema, registerSchema } from "@/validations/auth.validation";
import { NextRequest } from "next/server";
import { LoginDTO, RegisterDTO } from "../types/auth.types";

///* Controller for user registration */
export const createUserController = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { error, value } = registerSchema.validate(body);
    if (error) {
      return errorResponse(error.details[0].message, 400);
    }

    await connectDB();

    const user = await registerUser(value as RegisterDTO);
    return successResponse(user, "User registered successfully", 201);
  } catch (error) {
    console.error("Error in createUserAsync:", error);
    if (error instanceof Error) {
      if (error.message === "USER_ALREADY_EXISTS") {
        return errorResponse("User with this email already exists", 409);
      }
      return errorResponse(error.message, 500);
    }
  }
};

///* Controller for user login */
export const LoginController = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { error, value } = loginSchema.validate(body);

    if (error) {
      return errorResponse(error.details[0].message, 400);
    }

    await connectDB();

    const token: string = await login(value as LoginDTO);

    const res = successResponse({ token }, "Login successful", 200);

    res.cookies.set({
      name: "access_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 1 * 24 * 60 * 60, // Default to 1 day
    });
    return res;
  } catch (error) {
    console.error("Error in LoginController:", error);
    if (error instanceof Error) {
      switch (error.message) {
        case "USER_NOT_FOUND":
          return errorResponse("User not found", 404);
        case "USER_INACTIVE":
          return errorResponse("User account is inactive", 403);
        case "INVALID_CREDENTIALS":
          return errorResponse("Invalid email or password", 401);
        default:
          return errorResponse(error.message, 500);
      }
    }
  }
};
