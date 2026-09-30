import { NextRequest, NextResponse } from "next/server";
import { cookieName, createSession } from "@/lib/auth";
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (
    !body ||
    typeof body.email !== "string" ||
    typeof body.password !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim()) ||
    !body.password
  )
    return NextResponse.json(
      { error: "Enter a valid email address and password." },
      { status: 400 },
    );
  if (
    body.email.trim().toLowerCase() !== "demo@medalert.test" ||
    body.password !== "Guardian72!"
  )
    return NextResponse.json(
      { error: "That email or password isn't right. Please try again." },
      { status: 401 },
    );
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });
  return response;
}
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, "", { path: "/", maxAge: 0 });
  return response;
}
