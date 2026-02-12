import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "./withAuth";
import { AuthUser } from "@/types/auth.types";
import { errorResponse } from "@/utils/responses";

type Handler = (user: AuthUser) => Promise<NextResponse>;

export function withRole(req: NextRequest, roles: string[], handler: Handler) {
  return withAuth(req, async (user) => {
    if (!roles.includes(user.role)) {
      return errorResponse("Forbidden", 403);
    }

    return handler(user);
  });
}
