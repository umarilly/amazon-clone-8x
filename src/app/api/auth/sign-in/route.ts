import { NextResponse } from "next/server";
import { findUser } from "@/lib/server/users-store";
import { verifyPassword } from "@/lib/server/password";
import {
  createSessionCookieValue,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/server/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const user = email ? findUser(email) : undefined;
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    user: { name: user.name, email: user.email },
  });
  response.cookies.set(
    SESSION_COOKIE_NAME,
    createSessionCookieValue({ name: user.name, email: user.email }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    }
  );
  return response;
}
