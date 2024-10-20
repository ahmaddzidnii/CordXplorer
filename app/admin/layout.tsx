"use client";

import { SidebarAdmin } from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen">
        <SidebarAdmin />
        <div className="w-full overflow-auto">{children}</div>
      </div>
    </>
  );
}
