import { Suspense } from "react";
import { SidebarWrapper } from "./_components/sidebar-wrapper";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role === "USER") {
    throw new Error("Forbidden to access this page");
  }
  return (
    <Suspense fallback={null}>
      <div className="mx-auto max-w-[1920px]">
        <SidebarWrapper>{children}</SidebarWrapper>
      </div>
    </Suspense>
  );
}
