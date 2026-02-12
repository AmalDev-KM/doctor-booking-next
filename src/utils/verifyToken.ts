import jwt from "jsonwebtoken";
import { AuthUser } from "@/types/auth.types";

export function verifyToken(token: string): AuthUser {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET missing");
  }

  return jwt.verify(token, secret) as AuthUser;
}
