import jwt, { Secret, SignOptions } from "jsonwebtoken";

/*
  Payload type
*/
export interface JwtPayload {
  _id: string;
  email: string;
  name: string;
  role: string;
}

/*
  Generate Token
*/
export function generateToken(user: JwtPayload): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET not defined");
  }

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
  };

  return jwt.sign(user, secret as Secret, options);
}
