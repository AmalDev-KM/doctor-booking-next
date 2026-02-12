import { NextRequest } from "next/server";

export function getTokenFromReq(req: NextRequest) {
  const cookie = req.cookies.get("access_token");
  return cookie?.value;
}
