import { NextRequest, NextResponse } from "next/server";
import { getTokenFromReq } from "@/utils/getTokenFromReq";
import { verifyToken } from "@/utils/verifyToken";
import { AuthUser } from "@/types/auth.types";
import { errorResponse } from "@/utils/responses";

type Handler = (user: AuthUser) => Promise<NextResponse>;

export async function withAuth(req: NextRequest, handler: Handler) {
  try {
    const token = getTokenFromReq(req);

    if (!token) {
      return errorResponse("Not authenticated", 401);
    }

    const user = verifyToken(token);

    return handler(user);
  } catch {
    return errorResponse("Invalid or expired token", 401);
  }
}
