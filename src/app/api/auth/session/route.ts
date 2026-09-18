import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionCookieValue } from "@/lib/server/session";

export async function GET(request: NextRequest) {
  const raw = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = verifySessionCookieValue(raw);
  return NextResponse.json({ user });
}
