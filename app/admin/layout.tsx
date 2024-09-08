"use client";

import { useSession } from "next-auth/react";
import { SidebarAdmin } from "./sidebar";
import { Loader } from "@/components/loader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!session?.data) {
    throw new Error("You need to be authenticated");
  }

  if (session?.data.user.role === "USER") {
    throw new Error("Forbidden to access this page");
  }
  return (
    <>
      <div className="flex h-screen">
        <SidebarAdmin />
        <div className="w-full overflow-auto">{children}</div>
      </div>
      {/* <div className="mx-auto max-w-[1920px]">
        <SidebarWrapper>{children}</SidebarWrapper>
      </div> */}
    </>
  );
}
