import { Suspense } from "react";
import { SidebarWrapper } from "./_components/sidebar-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <SidebarWrapper>{children}</SidebarWrapper>
    </Suspense>
  );
}
