import { Dashboard } from "./_components/dashboard";
import { cookies } from "next/headers";

export const metadata = {
  title: "Admin Page",
  description: "Admin Page",
};
export default async function AdminPage() {
  return <Dashboard />;
}
