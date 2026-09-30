import { redirect } from "next/navigation";
import { authenticated } from "@/lib/auth";
import Dashboard from "./dashboard";
export default async function Guardian() {
  if (!(await authenticated())) redirect("/login");
  return <Dashboard />;
}
