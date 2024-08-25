"use client";

import { useEffect, useState } from "react";

import { SidebarMobile } from "./sidebar-mobile";
import { SidebarDekstop } from "./sidebar-dekstop";
import { menuItems } from "@/constants/menu-admin-items";
import { usePathname } from "next/navigation";
import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { UserProfile } from "@/components/auth/user-profile";

export const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();

  const tab = menuItems.find((item) => item.href === pathname);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex">
      <SidebarMobile className="md:hidden" />
      <SidebarDekstop className="hidden md:flex" />
      <div className="min-h-screen w-full">
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border border-x-0 bg-primary-foreground p-3">
          <h1 className="text-3xl font-bold">{tab?.title}</h1>
          <div className="hidden items-center gap-x-3 md:flex">
            <ToogleTheme />
            <UserProfile showName={false} />
          </div>
        </header>
        <main className="mx-3">{children}</main>
      </div>
    </div>
  );
};
