"use client";

import { useEffect, useState } from "react";

import { SidebarMobile } from "./sidebar-mobile";
import { SidebarDekstop } from "./sidebar-dekstop";

export const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen">
      <div className="flex">
        <SidebarMobile className="md:hidden" />
        <SidebarDekstop className="hidden md:flex" />
        <div className="mx-3 min-h-screen w-full max-w-7xl 2xl:mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
