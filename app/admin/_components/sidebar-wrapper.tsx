"use client";

import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { Button } from "@/components/ui/button";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import React, { useEffect, useState } from "react";

import { IoMusicalNoteSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { SidebarMobile } from "./sidebar-mobile";
import { Logo } from "@/components/logo";

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
        <aside
          className={cn(
            "w-56 pt-5 border-e-2 min-h-screen  flex-col items-center justify-between hidden md:flex"
          )}
        >
          <div className="space-y-4 flex flex-col items-center">
            <div>
              <Logo />
            </div>
            <div className="flex w-full bg-fuchsia-300   rounded-lg">
              <Button
                variant="ghost"
                className="hover:bg-transparent"
              >
                <MdDashboard className="w-7 h-7 mr-3" />
                Dashboard
              </Button>
            </div>
            <div className="flex w-full rounded-lg">
              <Button
                variant="ghost"
                className="hover:bg-transparent"
              >
                <IoMusicalNoteSharp className="w-7 h-7 mr-3" />
                Your music
              </Button>
            </div>
          </div>
          <div className="space-y-4 pb-5">
            <div className="flex items-center gap-x-4">
              <ToogleTheme />
              <p className="font-semibold">Theme</p>
            </div>
            <div className="flex items-center gap-x-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-semibold">Admin</p>
            </div>
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
};
