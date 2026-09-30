import { NextResponse } from "next/server";
import { authenticated } from "@/lib/auth";
import { getDemoDevice } from "@/lib/device";
export async function GET() {
  if (!(await authenticated()))
    return NextResponse.json(
      { error: "Please sign in to Guardian." },
      { status: 401 },
    );
  return NextResponse.json(getDemoDevice(), {
    headers: { "Cache-Control": "no-store" },
  });
}
