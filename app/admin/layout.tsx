import { Suspense } from "react";
import { SidebarWrapper } from "./_components/sidebar-wrapper";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "border-primary",
        }}
      />
      <SidebarWrapper>{children}</SidebarWrapper>
    </Suspense>
  );
}
