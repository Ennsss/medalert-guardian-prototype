import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
export const cookieName = "guardian_demo";
const secret =
  process.env.SESSION_SECRET || "public-prototype-secret-not-production-auth";
const sign = (value: string) =>
  createHmac("sha256", secret).update(value).digest("hex");
export function createSession() {
  const expires = String(Date.now() + 3600_000);
  return `${expires}.${sign(expires)}`;
}
export function verifySession(value?: string) {
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (
    !expires ||
    !signature ||
    !/^\d+$/.test(expires) ||
    Number(expires) <= Date.now()
  )
    return false;
  const expected = Buffer.from(sign(expires));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
export async function authenticated() {
  return verifySession((await cookies()).get(cookieName)?.value);
}
