import { ToogleTheme } from "@/components/navbar/toogle-theme";
import { Button } from "@/components/ui/button";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { useEffect, useState } from "react";

import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const SidebarMobile = ({ className }: { className?: string }) => {
  return (
    <aside
      className={cn(
        "w-16 pt-5 border-e-2 shadow-lg min-h-screen flex flex-col items-center justify-between",
        className
      )}
    >
      <div className="space-y-4 flex flex-col items-center">
        <div>
          <Button variant="ghost">
            <IoIosArrowDropright className="w-7 h-7" />
          </Button>
        </div>
        <div>
          <img
            src="/logo.svg"
            alt="logo"
            className="w-8 h-8 aspect-square"
          />
        </div>
        <div className="flex">
          <Button variant="ghost">
            <MdDashboard className="w-7 h-7" />
          </Button>
        </div>
      </div>
      <div className="space-y-4 pb-5">
        <ToogleTheme />
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </aside>
  );
};
