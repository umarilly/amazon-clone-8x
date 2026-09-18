import { NextResponse } from "next/server";
import { createUser, findUser } from "@/lib/server/users-store";
import { hashPassword } from "@/lib/server/password";
import {
  createSessionCookieValue,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/server/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are all required." },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters." },
      { status: 400 }
    );
  }
  if (findUser(email)) {
    return NextResponse.json(
      { error: "An account with that email already exists." },
      { status: 409 }
    );
  }

  createUser({ name, email, passwordHash: hashPassword(password) });

  const response = NextResponse.json({ user: { name, email } });
  response.cookies.set(
    SESSION_COOKIE_NAME,
    createSessionCookieValue({ name, email }),
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
